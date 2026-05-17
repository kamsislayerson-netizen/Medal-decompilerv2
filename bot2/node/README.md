# Medal Bot2 Node

A Discord bot that wraps the `medal-x86_64-linux-musl` or `medal.exe` decompiler binary.

## Features

- `.decomp` command
- Supports attached bytecode files or Base64 payloads
- Supports `--lua51` for Lua 5.1
- Keepalive HTTP server on `/`

## Setup

1. Copy `medal-x86_64-linux-musl` and/or `medal.exe` to the repo root.
2. Create `bot2/node/.env` from `bot2/node/.env.example`.
3. Set `DISCORD_TOKEN`.

## Run locally

```bash
cd bot2/node
npm install
npm start
```

## Docker

Build the Docker image from the repo root:

```bash
docker build -f bot2/node/Dockerfile . -t medal-bot2-node
```

Run the container:

```bash
docker run -e DISCORD_TOKEN=your_token -e PORT=3000 -p 3000:3000 medal-bot2-node
```

## Railway / Render

- Use `PORT` from the environment.
- Ensure the binary is included by building from the repo root.
- Set `DISCORD_TOKEN` in the service environment.

## Command usage

In Discord:

```text
.decomp --lua51
```

Attach a Lua 5.1 bytecode file or paste Base64-encoded bytecode after the command.
