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
  address [options]   Create bech32 addresses and keys from the seed.
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
HRP: iota
Coin: 4218
Key Type: Ed25519
Key Format: hex

Generating addresses

Index: 0
Address: iota1qzl6pvdadahge7yyqdyknrutuwnjafntdjlnfv94vndue9qupkr9224vjv7
Private Key: 0xa72161f8b9714c8382bcb7f72a5ea178880495fa85b1376a138249aaf1b2e837
Public Key: 0xe6994b391c937a604315a9936393f0ef1ad2d49bf5f21573316dc024c1dcb3ae

Index: 1
Address: iota1qq0hu7h6aguva0z0zlayukdjpq3x5dkvyt4gz5gxd7tvuye70sgqv55tgqd
Private Key: 0xcc57b040833465b530cd87e0c427162a7313f41e15484ef74f641cbb4739d376
Public Key: 0xcfee67931921b9cf86dbb7f91807b27a275f57364e71d849b86bfc8f671d0f32

Index: 2
Address: iota1qpqeq9xrnz7w7wenfa2ku02p73a90cpz6h7lprz458ydxjtsy009sutjley
Private Key: 0x254c4ac4ec71e69bfb244052f8e96435aeefe9da0b0cb432f490fadd51576c49
Public Key: 0x9fc74352fd77f3c49d714eb67339195a291f6e56bdfca9224962815fac3edc62

Index: 3
Address: iota1qzj5chjj2r6es9m50ssy22adlkankz2cf4gch7gs76mnq4l2c4dck53p87a
Private Key: 0x9a58e95dc70b77afa5ac93c5b4af890159c0ca8a69a1971181ba1f4a021edd57
Public Key: 0x42f8ab19112418266e7b84edaa63e12e4ef08106d8ccceb930f0956203532363

Index: 4
Address: iota1qzyyqzdcpufrpg2h8n4ljmzgzcsf0vcym6c7rv8l08s7rufjj2pkzefpl6f
Private Key: 0xff4ed1b01af12a6b87e9b95a7cdecab4be3ba920e8090457189e0f7b9cff2704
Public Key: 0x19ebdb080b0b8b485249c18ebc841d574429c994830cda139d84b14bf5f92025

Index: 5
Address: iota1qpuq48kqkk582l4c2l0gx9vrmdnfh69rrr2xdusnl25htwy6j4s4jt5vqe8
Private Key: 0x3445b21235ec0d35c7b9030262ad361101c08d57cda5d6c8a9a427a8b7c7fa17
Public Key: 0xb01632576d4f8fbddebc3bc624e2d5beb41f0352a22a7b8aa7895e4e746e4979

Index: 6
Address: iota1qpvn3wgyfm4t78ad9qpdee3dwmcsp5h5k8c6saundlf8f0e5apyhs5xam7e
Private Key: 0x35e609b27328f02cbf944e256d26b50259af571614f491b5823ac794ec23dd40
Public Key: 0x6156dbd30118e3e9b65dfdbfcdd8d33a5397e1e83eb5ca9271088189eae725d6

Index: 7
Address: iota1qrvx8r3tch4nufjrwrdes5rgl4ak8qx445532z0rmynrz4j2fa05uwlegwf
Private Key: 0x512f34563657f31f93f6ff675a5cc2bdecb60c04f70c1e6989600bec709bfe81
Public Key: 0xeaecd2c8c1b0a5e76e740b65189ae69acdcbe2555343b3bfbd5230873d7d367e

Index: 8
Address: iota1qqeyes0f5nqpe5t86slkph2nufj2e496eexyfxec3q7lu45veyvtcp9tz47
Private Key: 0xf2249753e80bb53776dccae45195bd36079f17ecd758eb71c0ce3d30d39248e9
Public Key: 0xd744fe270e65f348fda0761f05df3c597afd85dfa3a2d57ba468a62dae89d658

Index: 9
Address: iota1qrdxdv0uqpy6pwlgp8j5wdscj88jrwxzuhye6z2tzkrqp5l65kk2spzplej
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

sage: twin-crypto address [options]

Create a number of bech32 addresses and their associated key pairs from the seed.

Options:
  --seed <seed>          The seed to use for generating the addresses, this can be either hex, base64 or an environment variable name. For an environment variable start the value with a !
  --load-env <env>       Load the env file to initialise any environment variables.
  --start <number>       The index of the first address to create. (default: "0")
  --count <number>       The number of addresses to create, max 100. (default: "10")
  --account <number>     The account used to generate the bech32 addresses. (default: "0")
  --hrp <hrp>            The human readable part of the bech32 addresses. (default: "iota")
  --coin <coin>          The coin type used to generate the bech32 addresses. (default: "4218")
  --key-type <type>      The type of key to generate. (choices: "Ed25519", "Secp256k1", default: "Ed25519")
  --key-format <format>  The format to output the keys. (choices: "hex", "base64", default: "hex")
  --no-console           Hides the addresses and keys in the console.
  --json <filename>      Creates a JSON file containing the addresses and keys.
  --merge-json           If the JSON file already exists merge the data instead of overwriting.
  --env <filename>       Creates an env file containing the addresses and keys.
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
ADDRESS_0="iota1qqcpqyrnqtzteu7k26dgjvjp3x76tts526prtwrjq99v50pyv6l9xysdcg8"
ADDRESS_0_PRIVATE_KEY="0x3b2863db878ce156a46d2142c72baa7807a40a990684604ff86456821228d978"
ADDRESS_0_PUBLIC_KEY="0x6b6eb9e54b44bfbc65c4a02c6489609fbc9588e640ca44bfdfdb1af4e5874905"
ADDRESS_1="iota1qrqyyyuhfzgrp7ducjapg8pta3w877nu0u5jpe50cxx39qjs08kczw7uj4v"
ADDRESS_1_PRIVATE_KEY="0xc5038b4c0b1dc46769687e77555a7be176e22de4262cf5aabf11290ab7c8d856"
ADDRESS_1_PUBLIC_KEY="0x603d9b2d25341d142524867536e3ee94d3e02a45fe498ec4c3473b0449446d77"
....
```

and address.json

```json
{
  "0": {
    "bech32": "iota1qqcpqyrnqtzteu7k26dgjvjp3x76tts526prtwrjq99v50pyv6l9xysdcg8",
    "privateKey": "0x3b2863db878ce156a46d2142c72baa7807a40a990684604ff86456821228d978",
    "publicKey": "0x6b6eb9e54b44bfbc65c4a02c6489609fbc9588e640ca44bfdfdb1af4e5874905"
  },
  "1": {
    "bech32": "iota1qrqyyyuhfzgrp7ducjapg8pta3w877nu0u5jpe50cxx39qjs08kczw7uj4v",
    "privateKey": "0xc5038b4c0b1dc46769687e77555a7be176e22de4262cf5aabf11290ab7c8d856",
    "publicKey": "0x603d9b2d25341d142524867536e3ee94d3e02a45fe498ec4c3473b0449446d77"
  },
  ...
}
```
