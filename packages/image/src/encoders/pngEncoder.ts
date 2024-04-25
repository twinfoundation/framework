// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-bitwise */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-continue */
/* eslint-disable unicorn/prefer-math-trunc */
import { Compression } from "@gtsc/core";
import type { Frame } from "./png/frame";
import type { ImageData } from "./png/imageData";
import type { Leaf } from "./png/leaf";

/**
 * PNG Encoder.
 * Based on https://github.com/photopea/UPNG.js.
 */
export class PngEncoder {
	/**
	 * Encode the image frames to png.
	 * @param buffers The frame buffers to encode.
	 * @param w The image width.
	 * @param h The image height.
	 * @returns The data for the image.
	 */
	public async encode(buffers: ArrayBuffer[], w: number, h: number): Promise<Uint8Array> {
		const ps = 0;
		const forbidPlte = false;
		const data = new Uint8Array(buffers[0].byteLength * buffers.length + 100);
		const wr = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
		for (let i = 0; i < 8; i++) {
			data[i] = wr[i];
		}
		let offset = 8;

		const nImg = await this.compressPNG(buffers, w, h, ps, forbidPlte);

		this.writeUint(data, offset, 13);
		offset += 4;
		// cspell:disable-next-line
		this.writeASCII(data, offset, "IHDR");
		offset += 4;
		this.writeUint(data, offset, w);
		offset += 4;
		this.writeUint(data, offset, h);
		offset += 4;
		data[offset] = nImg.depth;
		offset++;
		data[offset] = nImg.cType;
		offset++;
		data[offset] = 0; // compress
		offset++;
		data[offset] = 0; // filter
		offset++;
		data[offset] = 0; // interlace
		offset++;
		this.writeUint(data, offset, this.crc(data, offset - 17, 17));
		offset += 4; // crc

		// 9 bytes to say, that it is sRGB
		this.writeUint(data, offset, 1);
		offset += 4;
		this.writeASCII(data, offset, "sRGB");
		offset += 4;
		data[offset] = 1;
		offset++;
		this.writeUint(data, offset, this.crc(data, offset - 5, 5));
		offset += 4; // crc

		const anim = buffers.length > 1;
		if (anim) {
			this.writeUint(data, offset, 8);
			offset += 4;
			this.writeASCII(data, offset, "acTL");
			offset += 4;
			this.writeUint(data, offset, buffers.length);
			offset += 4;
			this.writeUint(data, offset, 0);
			offset += 4;
			this.writeUint(data, offset, this.crc(data, offset - 12, 12));
			offset += 4; // crc
		}

		if (nImg.cType === 3) {
			const dl = nImg.plte.length;
			this.writeUint(data, offset, dl * 3);
			offset += 4;
			this.writeASCII(data, offset, "PLTE");
			offset += 4;
			for (let i = 0; i < dl; i++) {
				const ti = i * 3;
				const c = nImg.plte[i];
				const r = c & 255;
				const g = (c >> 8) & 255;
				const b = (c >> 16) & 255;
				data[offset + ti + 0] = r;
				data[offset + ti + 1] = g;
				data[offset + ti + 2] = b;
			}
			offset += dl * 3;
			this.writeUint(data, offset, this.crc(data, offset - dl * 3 - 4, dl * 3 + 4));
			offset += 4; // crc

			if (nImg.gotAlpha) {
				this.writeUint(data, offset, dl);
				offset += 4;
				this.writeASCII(data, offset, "tRNS");
				offset += 4;
				for (let i = 0; i < dl; i++) {
					data[offset + i] = (nImg.plte[i] >> 24) & 255;
				}
				offset += dl;
				this.writeUint(data, offset, this.crc(data, offset - dl - 4, dl + 4));
				offset += 4; // crc
			}
		}

		let fi = 0;
		for (let j = 0; j < nImg.frames.length; j++) {
			const fr = nImg.frames[j];
			if (anim) {
				this.writeUint(data, offset, 26);
				offset += 4;
				this.writeASCII(data, offset, "fcTL");
				offset += 4;
				this.writeUint(data, offset, fi++);
				offset += 4;
				this.writeUint(data, offset, fr.rect.width);
				offset += 4;
				this.writeUint(data, offset, fr.rect.height);
				offset += 4;
				this.writeUint(data, offset, fr.rect.x);
				offset += 4;
				this.writeUint(data, offset, fr.rect.y);
				offset += 4;
				this.writeUshort(data, offset, 0);
				offset += 2;
				this.writeUshort(data, offset, 1000);
				offset += 2;
				data[offset] = fr.dispose;
				offset++; // dispose
				data[offset] = fr.blend;
				offset++; // blend
				this.writeUint(data, offset, this.crc(data, offset - 30, 30));
				offset += 4; // crc
			}

			const imgD = fr.cImg;
			const dl: number = imgD?.length ?? 0;
			this.writeUint(data, offset, dl + (j === 0 ? 0 : 4));
			offset += 4;
			const iOff = offset;
			// cspell:disable-next-line
			this.writeASCII(data, offset, j === 0 ? "IDAT" : "fdAT");
			offset += 4;
			if (j !== 0) {
				this.writeUint(data, offset, fi++);
				offset += 4;
			}
			if (imgD) {
				for (let i = 0; i < dl; i++) {
					data[offset + i] = imgD[i];
				}
			}
			offset += dl;
			this.writeUint(data, offset, this.crc(data, iOff, offset - iOff));
			offset += 4; // crc
		}

		this.writeUint(data, offset, 0);
		offset += 4;
		// cspell:disable-next-line
		this.writeASCII(data, offset, "IEND");
		offset += 4;
		this.writeUint(data, offset, this.crc(data, offset - 4, 4));
		offset += 4; // crc

		return new Uint8Array(data.buffer.slice(0, offset));
	}

	/**
	 * @internal
	 */
	private async compressPNG(
		buffers: ArrayBuffer[],
		w: number,
		h: number,
		ps: number,
		forbidPlte: boolean
	): Promise<ImageData> {
		const out = this.compress(buffers, w, h, ps, 0, forbidPlte);
		for (let i = 0; i < buffers.length; i++) {
			const frm = out.frames[i];
			const nw = frm.rect.width;
			const nh = frm.rect.height;
			const bpl = frm.bpl;
			const bpp = frm.bpp;
			const fData = new Uint8Array(nw * bpl + nh);
			frm.cImg = await this.filterZero(frm.img, nh, bpp, bpl, fData);
		}
		return out;
	}

	/**
	 * @internal
	 */
	private compress(
		inBuffers: ArrayBuffer[],
		w: number,
		h: number,
		inPs: number,
		forGIF: number,
		forbidPlte: boolean
	): ImageData {
		let cType = 6;
		let depth = 8;
		let bpp = 4;
		let alphaAnd = 255;
		let ps = inPs;
		let buffers = inBuffers;

		for (let j = 0; j < buffers.length; j++) {
			// when not quantized, other frames can contain colors, that are not in an initial frame
			const img = new Uint8Array(buffers[j]);
			const iLen = img.length;
			for (let i = 0; i < iLen; i += 4) {
				alphaAnd &= img[i + 3];
			}
		}
		let gotAlpha: boolean = alphaAnd !== 255;

		const cMap: { [id: number]: number } = {};
		const pLte = [];
		if (buffers.length !== 0) {
			cMap[0] = 0;
			pLte.push(0);
			if (ps !== 0) {
				ps--;
			}
		}

		if (ps !== 0) {
			const qRes = this.quantize(buffers, ps, forGIF);
			buffers = qRes.buffers;
			for (let i = 0; i < qRes.plte.length; i++) {
				const c = qRes.plte[i].est?.rgba ?? 0;
				if (!cMap[c]) {
					cMap[c] = pLte.length;
					pLte.push(c);
				}
			}
		} else {
			// what if ps==0, but there are <=256 colors?  we still need to detect, if the palette could be used
			for (let j = 0; j < buffers.length; j++) {
				// when not quantized, other frames can contain colors, that are not in an initial frame
				const img32 = new Uint32Array(buffers[j]);
				const iLen = img32.length;
				for (let i = 0; i < iLen; i++) {
					const c = img32[i];
					if ((i < w || (c !== img32[i - 1] && c !== img32[i - w])) && !cMap[c]) {
						cMap[c] = pLte.length;
						pLte.push(c);
						if (pLte.length >= 300) {
							break;
						}
					}
				}
			}
		}

		const brute = gotAlpha ? forGIF : false; // brute : frames can only be copied, not "blended"
		const cc = pLte.length;
		if (cc <= 256 && !forbidPlte) {
			if (cc <= 2) {
				depth = 1;
			} else if (cc <= 4) {
				depth = 2;
			} else if (cc <= 16) {
				depth = 4;
			} else {
				depth = 8;
			}
			if (forGIF) {
				depth = 8;
			}
			gotAlpha = true;
		}

		const frames: Frame[] = [];
		for (let j = 0; j < buffers.length; j++) {
			let cImg = new Uint8Array(buffers[j]);
			let cImg32 = new Uint32Array(cImg.buffer);

			let nx = 0;
			let ny = 0;
			let nw = w;
			let nh = h;
			let blend = 0;
			if (j !== 0 && !brute) {
				const tLim = forGIF || j === 1 || frames[frames.length - 2].dispose === 2 ? 1 : 2;
				let tStp = 0;
				let tArea = 1e9;
				for (let it = 0; it < tLim; it++) {
					const p32 = new Uint32Array(buffers[j - 1 - it]);
					let mix = w;
					let miy = h;
					let max = -1;
					let may = -1;
					for (let y = 0; y < h; y++) {
						for (let x = 0; x < w; x++) {
							const i = y * w + x;
							if (cImg32[i] !== p32[i]) {
								if (x < mix) {
									mix = x;
								}
								if (x > max) {
									max = x;
								}
								if (y < miy) {
									miy = y;
								}
								if (y > may) {
									may = y;
								}
							}
						}
					}
					const sArea = max === -1 ? 1 : (max - mix + 1) * (may - miy + 1);
					if (sArea < tArea) {
						tArea = sArea;
						tStp = it;
						if (max === -1) {
							nx = 0;
							ny = 0;
							nw = 1;
							nh = 1;
						} else {
							nx = mix;
							ny = miy;
							nw = max - mix + 1;
							nh = may - miy + 1;
						}
					}
				}

				const pImg = new Uint8Array(buffers[j - 1 - tStp]);
				if (tStp === 1) {
					frames[frames.length - 1].dispose = 2;
				}

				const nImg = new Uint8Array(nw * nh * 4);
				this.copyTile(pImg, w, h, nImg, nw, nh, -nx, -ny, 0);
				if (this.copyTile(cImg, w, h, nImg, nw, nh, -nx, -ny, 3)) {
					this.copyTile(cImg, w, h, nImg, nw, nh, -nx, -ny, 2);
					blend = 1;
				} else {
					this.copyTile(cImg, w, h, nImg, nw, nh, -nx, -ny, 0);
					blend = 0;
				}
				cImg = nImg;
				cImg32 = new Uint32Array(cImg.buffer);
			}
			let bpl = 4 * nw;
			if (cc <= 256 && !forbidPlte) {
				bpl = Math.ceil((depth * nw) / 8);
				const nImg = new Uint8Array(bpl * nh);
				for (let y = 0; y < nh; y++) {
					const i = y * bpl;
					const ii = y * nw;
					if (depth === 8) {
						for (let x = 0; x < nw; x++) {
							nImg[i + x] = cMap[cImg32[ii + x]];
						}
					} else if (depth === 4) {
						for (let x = 0; x < nw; x++) {
							nImg[i + (x >> 1)] |= cMap[cImg32[ii + x]] << (4 - (x & 1) * 4);
						}
					} else if (depth === 2) {
						for (let x = 0; x < nw; x++) {
							nImg[i + (x >> 2)] |= cMap[cImg32[ii + x]] << (6 - (x & 3) * 2);
						}
					} else if (depth === 1) {
						for (let x = 0; x < nw; x++) {
							nImg[i + (x >> 3)] |= cMap[cImg32[ii + x]] << (7 - (x & 7) * 1);
						}
					}
				}
				cImg = nImg;
				cType = 3;
				bpp = 1;
			} else if (!gotAlpha && buffers.length === 1) {
				// some next "reduced" frames may contain alpha for blending
				const nImg = new Uint8Array(nw * nh * 3);
				const area = nw * nh;
				for (let i = 0; i < area; i++) {
					const ti = i * 3;
					const qi = i * 4;
					nImg[ti] = cImg[qi];
					nImg[ti + 1] = cImg[qi + 1];
					nImg[ti + 2] = cImg[qi + 2];
				}
				cImg = nImg;
				cType = 2;
				bpp = 3;
				bpl = 3 * nw;
			}
			frames.push({
				rect: {
					x: nx,
					y: ny,
					width: nw,
					height: nh
				},
				img: cImg,
				bpl,
				bpp,
				blend,
				dispose: brute ? 1 : 0
			});
		}
		return { cType, depth, plte: pLte, gotAlpha, frames };
	}

	/**
	 * @internal
	 */
	private async filterZero(
		img: Uint8Array,
		h: number,
		bpp: number,
		bpl: number,
		data: Uint8Array
	): Promise<Uint8Array> {
		const fls = [];
		for (let t = 0; t < 5; t++) {
			if (h * bpl > 500000 && (t === 2 || t === 3 || t === 4)) {
				continue;
			}
			for (let y = 0; y < h; y++) {
				this.filterLine(data, img, y, bpl, bpp, t);
			}
			const deflated = await Compression.compress(data, "deflate");
			fls.push(deflated);
			if (bpp === 1) {
				break;
			}
		}
		let ti: number = 0;
		let tSize = 1e9;
		for (let i = 0; i < fls.length; i++) {
			if (fls[i].length < tSize) {
				ti = i;
				tSize = fls[i].length;
			}
		}
		return fls[ti];
	}

	/**
	 * @internal
	 */
	private filterLine(
		data: Uint8Array,
		img: Uint8Array,
		y: number,
		bpl: number,
		bpp: number,
		type: number
	): void {
		const i = y * bpl;
		let di = i + y;
		data[di] = type;
		di++;

		if (type === 0) {
			for (let x = 0; x < bpl; x++) {
				data[di + x] = img[i + x];
			}
		} else if (type === 1) {
			for (let x = 0; x < bpp; x++) {
				data[di + x] = img[i + x];
			}
			for (let x = bpp; x < bpl; x++) {
				data[di + x] = (img[i + x] - img[i + x - bpp] + 256) & 255;
			}
		} else if (y === 0) {
			for (let x = 0; x < bpp; x++) {
				data[di + x] = img[i + x];
			}

			if (type === 2) {
				for (let x = bpp; x < bpl; x++) {
					data[di + x] = img[i + x];
				}
			}
			if (type === 3) {
				for (let x = bpp; x < bpl; x++) {
					data[di + x] = (img[i + x] - (img[i + x - bpp] >> 1) + 256) & 255;
				}
			}
			if (type === 4) {
				for (let x = bpp; x < bpl; x++) {
					data[di + x] = (img[i + x] - this.paeth(img[i + x - bpp], 0, 0) + 256) & 255;
				}
			}
		} else {
			if (type === 2) {
				for (let x = 0; x < bpl; x++) {
					data[di + x] = (img[i + x] + 256 - img[i + x - bpl]) & 255;
				}
			}
			if (type === 3) {
				for (let x = 0; x < bpp; x++) {
					data[di + x] = (img[i + x] + 256 - (img[i + x - bpl] >> 1)) & 255;
				}
				for (let x = bpp; x < bpl; x++) {
					data[di + x] = (img[i + x] + 256 - ((img[i + x - bpl] + img[i + x - bpp]) >> 1)) & 255;
				}
			}
			if (type === 4) {
				for (let x = 0; x < bpp; x++) {
					data[di + x] = (img[i + x] + 256 - this.paeth(0, img[i + x - bpl], 0)) & 255;
				}
				for (let x = bpp; x < bpl; x++) {
					data[di + x] =
						(img[i + x] +
							256 -
							this.paeth(img[i + x - bpp], img[i + x - bpl], img[i + x - bpp - bpl])) &
						255;
				}
			}
		}
	}

	/**
	 * @internal
	 */
	private paeth(a: number, b: number, c: number): number {
		const p = a + b - c;
		const pa = Math.abs(p - a);
		const pb = Math.abs(p - b);
		const pc = Math.abs(p - c);
		if (pa <= pb && pa <= pc) {
			return a;
		}
		if (pb <= pc) {
			return b;
		}
		return c;
	}

	/**
	 * @internal
	 */
	private writeASCII(data: Uint8Array, p: number, s: string): void {
		for (let i = 0; i < s.length; i++) {
			data[p + i] = s.charCodeAt(i);
		}
	}

	/**
	 * @internal
	 */
	private writeUint(buff: Uint8Array, p: number, n: number): void {
		buff[p] = (n >> 24) & 255;
		buff[p + 1] = (n >> 16) & 255;
		buff[p + 2] = (n >> 8) & 255;
		buff[p + 3] = n & 255;
	}

	/**
	 * @internal
	 */
	private writeUshort(buff: Uint8Array, p: number, n: number): void {
		buff[p] = (n >> 8) & 255;
		buff[p + 1] = n & 255;
	}

	/**
	 * @internal
	 */
	private copyTile(
		sb: Uint8Array,
		sw: number,
		sh: number,
		tb: Uint8Array,
		tw: number,
		th: number,
		xOffset: number,
		yOffset: number,
		mode: number
	): boolean {
		const w = Math.min(sw, tw);
		const h = Math.min(sh, th);
		let si = 0;
		let ti = 0;
		for (let y = 0; y < h; y++) {
			for (let x = 0; x < w; x++) {
				if (xOffset >= 0 && yOffset >= 0) {
					si = (y * sw + x) << 2;
					ti = ((yOffset + y) * tw + xOffset + x) << 2;
				} else {
					si = ((-yOffset + y) * sw - xOffset + x) << 2;
					ti = (y * tw + x) << 2;
				}

				if (mode === 0) {
					tb[ti] = sb[si];
					tb[ti + 1] = sb[si + 1];
					tb[ti + 2] = sb[si + 2];
					tb[ti + 3] = sb[si + 3];
				} else if (mode === 1) {
					const fa = sb[si + 3] * (1 / 255);
					const fr = sb[si] * fa;
					const fg = sb[si + 1] * fa;
					const fb = sb[si + 2] * fa;
					const ba = tb[ti + 3] * (1 / 255);
					const br = tb[ti] * ba;
					const bg = tb[ti + 1] * ba;
					const bb = tb[ti + 2] * ba;

					const ifa = 1 - fa;
					const oa = fa + ba * ifa;
					const ioa = oa === 0 ? 0 : 1 / oa;
					tb[ti + 3] = 255 * oa;
					tb[ti + 0] = (fr + br * ifa) * ioa;
					tb[ti + 1] = (fg + bg * ifa) * ioa;
					tb[ti + 2] = (fb + bb * ifa) * ioa;
				} else if (mode === 2) {
					// copy only differences, otherwise zero
					const fa = sb[si + 3];
					const fr = sb[si];
					const fg = sb[si + 1];
					const fb = sb[si + 2];
					const ba = tb[ti + 3];
					const br = tb[ti];
					const bg = tb[ti + 1];
					const bb = tb[ti + 2];
					if (fa === ba && fr === br && fg === bg && fb === bb) {
						tb[ti] = 0;
						tb[ti + 1] = 0;
						tb[ti + 2] = 0;
						tb[ti + 3] = 0;
					} else {
						tb[ti] = fr;
						tb[ti + 1] = fg;
						tb[ti + 2] = fb;
						tb[ti + 3] = fa;
					}
				} else if (mode === 3) {
					// check if can be blended
					const fa = sb[si + 3];
					const fr = sb[si];
					const fg = sb[si + 1];
					const fb = sb[si + 2];
					const ba = tb[ti + 3];
					const br = tb[ti];
					const bg = tb[ti + 1];
					const bb = tb[ti + 2];
					if (fa === ba && fr === br && fg === bg && fb === bb) {
						continue;
					}
					if (fa < 220 && ba > 20) {
						return false;
					}
				}
			}
		}
		return true;
	}

	/**
	 * @internal
	 */
	private crc(b: Uint8Array, o: number, l: number): number {
		return this.crcUpdate(0xffffffff, b, o, l) ^ 0xffffffff;
	}

	/**
	 * @internal
	 */
	private crcUpdate(c: number, buf: Uint8Array, off: number, len: number): number {
		let localC = c;
		const crcTable = this.crcTable();
		for (let i = 0; i < len; i++) {
			localC = crcTable[(localC ^ buf[off + i]) & 0xff] ^ (localC >>> 8);
		}
		return localC;
	}

	/**
	 * @internal
	 */
	private crcTable(): Uint32Array {
		const tab = new Uint32Array(256);
		for (let n = 0; n < 256; n++) {
			let c = n;
			for (let k = 0; k < 8; k++) {
				if (c & 1) {
					c = 0xedb88320 ^ (c >>> 1);
				} else {
					c >>>= 1;
				}
			}
			tab[n] = c;
		}
		return tab;
	}

	/**
	 * @internal
	 */
	private quantize(
		buffers: ArrayBuffer[],
		ps: number,
		roundAlpha: number
	): { buffers: ArrayBuffer[]; plte: Leaf[] } {
		const imgs: Uint8Array[] = [];
		let total = 0;
		for (let i = 0; i < buffers.length; i++) {
			imgs.push(this.alphaMul(new Uint8Array(buffers[i]), roundAlpha));
			total += buffers[i].byteLength;
		}

		const nImg = new Uint8Array(total);
		const nImg32 = new Uint32Array(nImg.buffer);
		let nOff = 0;
		for (let i = 0; i < imgs.length; i++) {
			const img = imgs[i];
			const il = img.length;
			for (let j = 0; j < il; j++) {
				nImg[nOff + j] = img[j];
			}
			nOff += il;
		}

		const root: Leaf = {
			i0: 0,
			i1: nImg.length,
			bst: null,
			est: null,
			tDst: 0,
			left: null,
			right: null
		};
		root.bst = this.quantizeStats(nImg, root.i0, root.i1);
		root.est = this.quantizeEStats(root.bst);
		const leafs: Leaf[] = [root];

		while (leafs.length < ps) {
			let maxL = 0;
			let mi = 0;
			for (let i = 0; i < leafs.length; i++) {
				const est = leafs[i].est;
				if (est && est.L > maxL) {
					maxL = est.L;
					mi = i;
				}
			}
			if (maxL < 1e-3) {
				break;
			}
			const node = leafs[mi];

			const s0 = this.quantizeSplitPixels(
				nImg,
				nImg32,
				node.i0,
				node.i1,
				node.est?.e ?? [],
				node.est?.eMq255 ?? 0
			);

			const ln: Leaf = {
				i0: node.i0,
				i1: s0,
				bst: null,
				est: null,
				tDst: 0,
				left: null,
				right: null
			};
			ln.bst = this.quantizeStats(nImg, ln.i0, ln.i1);
			ln.est = this.quantizeEStats(ln.bst);
			const rn: Leaf = {
				i0: s0,
				i1: node.i1,
				bst: null,
				est: null,
				tDst: 0,
				left: null,
				right: null
			};
			rn.bst = {
				R: [],
				m: [],
				N: (node.bst?.N ?? 0) - ln.bst.N
			};
			for (let i = 0; i < 16; i++) {
				rn.bst.R[i] = (node.bst?.R[i] ?? 0) - ln.bst.R[i];
			}
			for (let i = 0; i < 4; i++) {
				rn.bst.m[i] = (node.bst?.m[i] ?? 0) - ln.bst.m[i];
			}
			rn.est = this.quantizeEStats(rn.bst);

			node.left = ln;
			node.right = rn;
			leafs[mi] = ln;
			leafs.push(rn);
		}
		leafs.sort((a, b) => (b.bst?.N ?? 0) - (a.bst?.N ?? 0));

		const outBuffers: ArrayBuffer[] = [];
		for (let ii = 0; ii < imgs.length; ii++) {
			const sb = new Uint8Array(imgs[ii]);
			const tb: Uint32Array = new Uint32Array(imgs[ii]);
			const len = sb.length;

			for (let i = 0; i < len; i += 4) {
				const r = sb[i] * (1 / 255);
				const g = sb[i + 1] * (1 / 255);
				const b = sb[i + 2] * (1 / 255);
				const a = sb[i + 3] * (1 / 255);

				let nd: Leaf | null = root;
				while (nd?.left) {
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					nd = this.quantizePlaneDst(nd.est!, r, g, b, a) <= 0 ? nd.left : nd.right;
				}

				tb[i >> 2] = nd?.est?.rgba ?? 0;
			}
			outBuffers[ii] = tb.buffer;
		}
		return { buffers: outBuffers, plte: leafs };
	}

	/**
	 * @internal
	 */
	private quantizeStats(
		nImg: Uint8Array,
		i0: number,
		i1: number
	): { R: number[]; m: number[]; N: number } {
		const R = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		const m = [0, 0, 0, 0];
		const N = (i1 - i0) >> 2;
		for (let i = i0; i < i1; i += 4) {
			const r = nImg[i] * (1 / 255);
			const g = nImg[i + 1] * (1 / 255);
			const b = nImg[i + 2] * (1 / 255);
			const a = nImg[i + 3] * (1 / 255);

			m[0] += r;
			m[1] += g;
			m[2] += b;
			m[3] += a;

			R[0] += r * r;
			R[1] += r * g;
			R[2] += r * b;
			R[3] += r * a;
			R[5] += g * g;
			R[6] += g * b;
			R[7] += g * a;
			R[10] += b * b;
			R[11] += b * a;
			R[15] += a * a;
		}
		R[4] = R[1];
		R[8] = R[2];
		R[12] = R[3];
		R[9] = R[6];
		R[13] = R[7];
		R[14] = R[11];

		return { R, m, N };
	}

	/**
	 * @internal
	 */
	private quantizeEStats(stats: { R: number[]; m: number[]; N: number }): {
		Cov: number[];
		q: number[];
		e: number[];
		L: number;
		eMq255: number;
		eMq: number;
		rgba: number;
	} {
		const R = stats.R;
		const m = stats.m;
		const N = stats.N;

		const m0 = m[0];
		const m1 = m[1];
		const m2 = m[2];
		const m3 = m[3];
		const iN = N === 0 ? 0 : 1 / N;
		const rj = [
			R[0] - m0 * m0 * iN,
			R[1] - m0 * m1 * iN,
			R[2] - m0 * m2 * iN,
			R[3] - m0 * m3 * iN,
			R[4] - m1 * m0 * iN,
			R[5] - m1 * m1 * iN,
			R[6] - m1 * m2 * iN,
			R[7] - m1 * m3 * iN,
			R[8] - m2 * m0 * iN,
			R[9] - m2 * m1 * iN,
			R[10] - m2 * m2 * iN,
			R[11] - m2 * m3 * iN,
			R[12] - m3 * m0 * iN,
			R[13] - m3 * m1 * iN,
			R[14] - m3 * m2 * iN,
			R[15] - m3 * m3 * iN
		];

		const A = rj;
		let b = [0.5, 0.5, 0.5, 0.5];
		let mi = 0;
		let tmi = 0;

		if (N !== 0) {
			for (let i = 0; i < 10; i++) {
				b = this.m4MultiplyVec(A, b);
				tmi = Math.sqrt(this.m4Dot(b, b));
				b = this.m4Sml(1 / tmi, b);
				if (Math.abs(tmi - mi) < 1e-9) {
					break;
				}
				mi = tmi;
			}
		}
		const q = [m0 * iN, m1 * iN, m2 * iN, m3 * iN];
		const eMq255 = this.m4Dot(this.m4Sml(255, q), b);

		const ia = q[3] < 0.001 ? 0 : 1 / q[3];

		return {
			Cov: rj,
			q,
			e: b,
			L: mi,
			eMq255,
			eMq: this.m4Dot(b, q),
			rgba:
				((Math.round(255 * q[3]) << 24) |
					(Math.round(255 * q[2] * ia) << 16) |
					(Math.round(255 * q[1] * ia) << 8) |
					(Math.round(255 * q[0] * ia) << 0)) >>>
				0
		};
	}

	/**
	 * @internal
	 */
	private quantizePlaneDst(
		est: { e: number[]; eMq: number },
		r: number,
		g: number,
		b: number,
		a: number
	): number {
		const e = est.e;
		return e[0] * r + e[1] * g + e[2] * b + e[3] * a - est.eMq;
	}

	/**
	 * @internal
	 */
	private quantizeSplitPixels(
		nImg: Uint8Array,
		nImg32: Uint32Array,
		i0in: number,
		i1in: number,
		e: number[],
		eMq: number
	): number {
		let i1 = i1in - 4;
		let i0 = i0in;
		while (i0 < i1) {
			while (this.quantizeVecDot(nImg, i0, e) <= eMq) {
				i0 += 4;
			}
			while (this.quantizeVecDot(nImg, i1, e) > eMq) {
				i1 -= 4;
			}
			if (i0 >= i1) {
				break;
			}

			const t = nImg32[i0 >> 2];
			nImg32[i0 >> 2] = nImg32[i1 >> 2];
			nImg32[i1 >> 2] = t;

			i0 += 4;
			i1 -= 4;
		}
		while (this.quantizeVecDot(nImg, i0, e) > eMq) {
			i0 -= 4;
		}
		return i0 + 4;
	}

	/**
	 * @internal
	 */
	private quantizeVecDot(nImg: Uint8Array, i: number, e: number[]): number {
		return nImg[i] * e[0] + nImg[i + 1] * e[1] + nImg[i + 2] * e[2] + nImg[i + 3] * e[3];
	}

	/**
	 * @internal
	 */
	private m4MultiplyVec(m: number[], v: number[]): number[] {
		return [
			m[0] * v[0] + m[1] * v[1] + m[2] * v[2] + m[3] * v[3],
			m[4] * v[0] + m[5] * v[1] + m[6] * v[2] + m[7] * v[3],
			m[8] * v[0] + m[9] * v[1] + m[10] * v[2] + m[11] * v[3],
			m[12] * v[0] + m[13] * v[1] + m[14] * v[2] + m[15] * v[3]
		];
	}

	/**
	 * @internal
	 */
	private m4Dot(x: number[], y: number[]): number {
		return x[0] * y[0] + x[1] * y[1] + x[2] * y[2] + x[3] * y[3];
	}

	/**
	 * @internal
	 */
	private m4Sml(a: number, y: number[]): number[] {
		return [a * y[0], a * y[1], a * y[2], a * y[3]];
	}

	/**
	 * @internal
	 */
	private alphaMul(img: Uint8Array, roundA: number): Uint8Array {
		const nImg = new Uint8Array(img.length);
		const area = img.length >> 2;
		for (let i = 0; i < area; i++) {
			const qi = i << 2;
			let ia = img[qi + 3];
			if (roundA) {
				ia = ia < 128 ? 0 : 255;
			}
			const a = ia * (1 / 255);
			nImg[qi + 0] = img[qi + 0] * a;
			nImg[qi + 1] = img[qi + 1] * a;
			nImg[qi + 2] = img[qi + 2] * a;
			nImg[qi + 3] = ia;
		}
		return nImg;
	}
}
