# @twin.org/crypto-cli - Examples

## Running

To install and run the CLI locally use the following commands:

```shell
npm install @twin.org/crypto-cli -g
twin-crypto
```

or run directly using NPX:

```shell
npx "@twin.org/crypto-cli"
```

You should see output similar to the following:

```shell
🌍 TWIN Crypto v1.0.0

Usage: twin-crypto [command]

Options:
  -V, --version       output the version number
  --lang <lang>       The language to display the output in. (default: "en")
  -h, --help          display help for command

Commands:
  mnemonic [options]  Create a mnemonic.
  address [options]   Create addresses and keys from the seed.
  help [command]      display help for command
```

## Command

### mnemonic

The mnemonic command can be used to generate a new mnemonic for use in the other crypto functions.

```shell
twin-crypto mnemonic
```

Output

```shell
🌍 TWIN Crypto v1.0.0

Mnemonic: cricket pumpkin clump warrior accident appear trophy exchange width ginger thank common must tiny inform feed orient ritual tackle tortoise few survey client object
Seed: 0x01fb73209537a33a2f03e419caed0eba48005b093b9a8ce35a93f5e3a1ad66ceaccb1afd4cd23ccaef3f0210e377a5118c90c7a5f1800be49a42d1c3dc0bb3fc

Done.
```

There are additional options you can specify for this command, to get the detail on these options issue the following command to get help.

```shell
twin-crypto mnemonic --help
```

Output

```shell
🌍 TWIN Crypto v1.0.0

Usage: twin-crypto mnemonic [options]

Create a mnemonic, will also generate the equivalent seed in hex and base64 format.

Options:
  --strength <number>     The number of words in the mnemonic, defaults to 256 which produces 24 words. (default: "256")
  --seed-format <format>  The format to output the seed. (choices: "hex", "base64", default: "hex")
  --no-console            Hides the mnemonic and seed in the console.
  --json <filename>       Creates a JSON file containing the mnemonic and seed.
  --env <filename>        Creates an env file containing the mnemonic and seed.
  -h, --help              display help for command
```

#### Example

To output generate mnemonic and base64 formatted seed, store them in a JSON and env file but not display them to the console you would enter the following.

```shell
twin-crypto mnemonic --seed-format base64 --no-console --json my.json --env my.env
```

The env file would look like:

```shell
MNEMONIC="word maze network cabbage romance empty axis scale vintage ride flash soup jelly cook give luxury rigid cigar noodle avocado current write clog little"
SEED="c/MkRa4rgvvf08nJy2v4Yadip5BpE56FW2jDXmjt4TMfoXrCoYo9Hunq9SQdabh+Mox0vR9J3INoVLCZPQ/UtA=="
```

and the JSON file would be:

```json
{
  "mnemonic": "word maze network cabbage romance empty axis scale vintage ride flash soup jelly cook give luxury rigid cigar noodle avocado current write clog little",
  "seed": "c/MkRa4rgvvf08nJy2v4Yadip5BpE56FW2jDXmjt4TMfoXrCoYo9Hunq9SQdabh+Mox0vR9J3INoVLCZPQ/UtA=="
}
```

### address

The address command can be used to generate addresses and key pairs based on the specified seed. The seed can be provided from the command line of read from an environment variable or .env file. By default 10 addresses will be generated starting at address index 0, for account 0.

```shell
twin-crypto address --seed 0x01fb73209537a33a2f03e419caed0eba48005b093b9a8ce35a93f5e3a1ad66ceaccb1afd4cd23ccaef3f0210e377a5118c90c7a5f1800be49a42d1c3dc0bb3fc
```

Output

```shell
🌍 TWIN Crypto v1.0.0

Seed: 0x01fb73209537a33a2f03e419caed0eba48005b093b9a8ce35a93f5e3a1ad66ceaccb1afd4cd23ccaef3f0210e377a5118c90c7a5f1800be49a42d1c3dc0bb3fc
Start: 0
Count: 10
Account: 0
Coin: 4218
Key Type: Ed25519
Key Format: hex

Generating addresses

Index: 0
Address: 0xbfa0b1bd6f6e8cf8840349698f8be3a72ea66b6cbf34b0b564dbcc941c0d8655
Private Key: 0xa72161f8b9714c8382bcb7f72a5ea178880495fa85b1376a138249aaf1b2e837
Public Key: 0xe6994b391c937a604315a9936393f0ef1ad2d49bf5f21573316dc024c1dcb3ae

Index: 1
Address: 0x1f7e7afaea38cebc4f17fa4e59b208226a36cc22ea8151066f96ce133e7c1006
Private Key: 0xcc57b040833465b530cd87e0c427162a7313f41e15484ef74f641cbb4739d376
Public Key: 0xcfee67931921b9cf86dbb7f91807b27a275f57364e71d849b86bfc8f671d0f32

Index: 2
Address: 0x419014c398bcef3b334f556e3d41f47a57e022d5fdf08c55a1c8d3497023de58
Private Key: 0x254c4ac4ec71e69bfb244052f8e96435aeefe9da0b0cb432f490fadd51576c49
Public Key: 0x9fc74352fd77f3c49d714eb67339195a291f6e56bdfca9224962815fac3edc62

Index: 3
Address: 0xa54c5e5250f59817747c20452badfdbb3b09584d518bf910f6b73057eac55b8b
Private Key: 0x9a58e95dc70b77afa5ac93c5b4af890159c0ca8a69a1971181ba1f4a021edd57
Public Key: 0x42f8ab19112418266e7b84edaa63e12e4ef08106d8ccceb930f0956203532363

Index: 4
Address: 0x884009b80f1230a1573cebf96c48162097b304deb1e1b0ff79e1e1f132928361
Private Key: 0xff4ed1b01af12a6b87e9b95a7cdecab4be3ba920e8090457189e0f7b9cff2704
Public Key: 0x19ebdb080b0b8b485249c18ebc841d574429c994830cda139d84b14bf5f92025

Index: 5
Address: 0x780a9ec0b5a8757eb857de831583db669be8a318d466f213faa975b89a956159
Private Key: 0x3445b21235ec0d35c7b9030262ad361101c08d57cda5d6c8a9a427a8b7c7fa17
Public Key: 0xb01632576d4f8fbddebc3bc624e2d5beb41f0352a22a7b8aa7895e4e746e4979

Index: 6
Address: 0x5938b9044eeabf1fad2802dce62d76f100d2f4b1f1a877936fd274bf34e84978
Private Key: 0x35e609b27328f02cbf944e256d26b50259af571614f491b5823ac794ec23dd40
Public Key: 0x6156dbd30118e3e9b65dfdbfcdd8d33a5397e1e83eb5ca9271088189eae725d6

Index: 7
Address: 0xd8638e2bc5eb3e264370db985068fd7b6380d5ad291509e3d92631564a4f5f4e
Private Key: 0x512f34563657f31f93f6ff675a5cc2bdecb60c04f70c1e6989600bec709bfe81
Public Key: 0xeaecd2c8c1b0a5e76e740b65189ae69acdcbe2555343b3bfbd5230873d7d367e

Index: 8
Address: 0x324cc1e9a4c01cd167d43f60dd53e264acd4bace4c449b38883dfe568cc918bc
Private Key: 0xf2249753e80bb53776dccae45195bd36079f17ecd758eb71c0ce3d30d39248e9
Public Key: 0xd744fe270e65f348fda0761f05df3c597afd85dfa3a2d57ba468a62dae89d658

Index: 9
Address: 0xda66b1fc0049a0bbe809e547361891cf21b8c2e5c99d094b158600d3faa5aca8
Private Key: 0x3bfb352e637ef067866e66974647d3758d80629dd1108f77956487da9ace80d9
Public Key: 0x9d10790d366deb6a73ea7666318cf46c8f5493346fc32865edbc3beda15872c6

Done.
```

There are additional options you can specify for this command, to get the detail on these options issue the following command to get help.

```shell
twin-crypto address --help
```

Output

```shell
🌍 TWIN Crypto v1.0.0

Usage: twin-crypto address [options]

Create a number of addresses and their associated key pairs from the seed.

Options:
  --seed <seed>          The seed to use for generating the addresses, this can be either hex, base64 or an environment variable name. For an environment variable start the value with a !
  --start <number>       The index of the first address to create. (default: "0")
  --count <number>       The number of addresses to create, max 100. (default: "10")
  --account <number>     The account used to generate the addresses. (default: "0")
  --coin <coin>          The coin type used to generate the addresses. (default: "4218")
  --key-type <type>      The type of key to generate. (choices: "Ed25519", "Secp256k1", default: "Ed25519")
  --key-format <format>  The format to output the keys. (choices: "hex", "base64", default: "hex")
  --no-console           Hides the output in the console.
  --json <filename>      Creates a JSON file containing the output.
  --merge-json           If the JSON file already exists merge the data instead of overwriting.
  --env <filename>       Creates an env file containing the output.
  --merge-env            If the env file already exists merge the data instead of overwriting.
  -h, --help             display help for command
```

#### Examples

To read from an env file and load the variable named SEED from the file, and output only 2 addresses, outputting the keys in base64 format.

```shell
twin-crypto address --load-env my.env --seed !SEED --count 2 --key-format base64
```

You can use the options to store the results in JSON or env files, and the `merge` options allow you to modify existing files should you wish.

```shell
twin-crypto address --load-env my.env --seed !SEED --env address.env --merge-env --json address.json --merge-json
```

The output of this command would produce address.env

```shell
ADDRESS_0="0xbfa0b1bd6f6e8cf8840349698f8be3a72ea66b6cbf34b0b564dbcc941c0d8655"
ADDRESS_0_PRIVATE_KEY="0xa72161f8b9714c8382bcb7f72a5ea178880495fa85b1376a138249aaf1b2e837"
ADDRESS_0_PUBLIC_KEY="0xe6994b391c937a604315a9936393f0ef1ad2d49bf5f21573316dc024c1dcb3ae"
ADDRESS_1="0x1f7e7afaea38cebc4f17fa4e59b208226a36cc22ea8151066f96ce133e7c1006"
ADDRESS_1_PRIVATE_KEY="0xcc57b040833465b530cd87e0c427162a7313f41e15484ef74f641cbb4739d376"
ADDRESS_1_PUBLIC_KEY="0xcfee67931921b9cf86dbb7f91807b27a275f57364e71d849b86bfc8f671d0f32"
....
```

and address.json

```json
{
      "0": {
         "address": "0xbfa0b1bd6f6e8cf8840349698f8be3a72ea66b6cbf34b0b564dbcc941c0d8655",
         "privateKey": "0xa72161f8b9714c8382bcb7f72a5ea178880495fa85b1376a138249aaf1b2e837",
         "publicKey": "0xe6994b391c937a604315a9936393f0ef1ad2d49bf5f21573316dc024c1dcb3ae"
      },
      "1": {
         "address": "0x1f7e7afaea38cebc4f17fa4e59b208226a36cc22ea8151066f96ce133e7c1006",
         "privateKey": "0xcc57b040833465b530cd87e0c427162a7313f41e15484ef74f641cbb4739d376",
         "publicKey": "0xcfee67931921b9cf86dbb7f91807b27a275f57364e71d849b86bfc8f671d0f32"
      },
  ...
}
```
