# Medal Node Bot

This Node.js bot listens for `.decomp` commands and runs the `medal-x86_64-linux-musl` binary to decompile Lua bytecode.

## Setup

1. Copy `medal-x86_64-linux-musl` into the repo root.
2. Create `bot/node/.env` from `.env.example`.
3. Set `DISCORD_TOKEN`.

## Run locally

```bash
cd bot/node
npm install
npm start
```

## Docker

Build from the repo root:

```bash
docker build -f bot/node/Dockerfile . -t medal-bot-node
```

Run:

```bash
docker run -e DISCORD_TOKEN=your_token -p 3000:3000 medal-bot-node
```

## Command usage

In Discord, type:

```text
.decomp --lua51
```

Attach a Lua 5.1 bytecode file to the message. The bot replies with the decompiled output.
