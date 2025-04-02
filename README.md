# change-fname

A simple Bun script to update your Farcaster fname.

## Setup

Make sure you have [Bun](https://bun.sh) installed

Clone the repo and install dependencies

```bash
git clone https://github.com/stevedylandev/change-fname
cd change-fname
bun install
```

> [!CAUTION]
> Do NOT give your Farcaster recovery phrase to anyone!! This script is designed to be run locally and never hosted for security reasons!!

Update the `.env.example` file to `.env` and add your Farcaster Account Mnemonic Phrase. This can be located inside the Warpcast account on **mobile** (not desktop/web), then going to `Settings > Advance > Show Farcaster recovery phrase`. DO NOT give your recover phrase to anyone!!

```bash
mv .env.example .env
```

```bash .env
# Replace with your recovery phrase
MNEMONIC="my special word list for my farcaster custody account"
```

## Usage

Oopen the `index.ts` file and update the constants at the top with your information.

> [!TIP]
> Be sure to check if your desired name is available with this curl command
> `curl https://fnames.farcaster.xyz/transfers?name=farcaster`

```typescript index.ts
const FID = 6023 // Your FID
const OLD_NAME = "stevedylandev" // Your current fname
const NEW_NAME = "coolsteve" // Your desired fname
```

Once edited save the file then run the file with `bun`.

```bash
bun index.ts
```

After the script has run be sure to go back into Warpcast mobile, click "Edit Profile" and be sure to select your new fname!

## Questions

[Feel free to give me a shot!](https://warpcast.com/steveddylandev.eth)
