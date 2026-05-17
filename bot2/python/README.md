# Medal Bot2 Python

A Discord bot that wraps the `medal-x86_64-linux-musl` or `medal.exe` decompiler binary.

## Features

- `.decomp` command
- Supports attached bytecode files or Base64 payloads
- Supports `--lua51` for Lua 5.1
- Keepalive Flask server on `/`

## Setup

1. Copy `medal-x86_64-linux-musl` and/or `medal.exe` to the repo root.
2. Create `bot2/python/.env` from `bot2/python/.env.example`.
3. Set `DISCORD_TOKEN`.

## Run locally

```bash
cd bot2/python
pip install -r requirements.txt
python app.py
```

## Docker

Build the Docker image from the repo root:

```bash
docker build -f bot2/python/Dockerfile . -t medal-bot2-python
```

Run the container:

```bash
docker run -e DISCORD_TOKEN=your_token -e PORT=3000 -p 3000:3000 medal-bot2-python
```

## Railway / Render

- Use `PORT` from the environment.
- Build from the repo root so the binary is copied into the image.
- Set `DISCORD_TOKEN` in the service environment.

## Command usage

In Discord:

```text
.decomp --lua51
```

Attach a Lua 5.1 bytecode file or paste Base64-encoded bytecode after the command.
