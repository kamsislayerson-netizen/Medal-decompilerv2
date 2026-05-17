# Medal Python Bot

This Python bot listens for `.decomp` commands and runs the `medal-x86_64-linux-musl` binary to decompile Lua bytecode.

## Setup

1. Copy `medal-x86_64-linux-musl` into the repo root.
2. Create `bot/python/.env` from `.env.example`.
3. Set `DISCORD_TOKEN`.

## Run locally

```bash
cd bot/python
pip install -r requirements.txt
python app.py
```

## Docker

Build from the repo root:

```bash
docker build -f bot/python/Dockerfile . -t medal-bot-python
```

Run:

```bash
docker run -e DISCORD_TOKEN=your_token -p 3000:3000 medal-bot-python
```

## Command usage

In Discord, type:

```text
.decomp --lua51
```

Attach a Lua 5.1 bytecode file to the message. The bot replies with the decompiled output.
