# Medal Bot2 Systems

This folder contains two complete bot systems built around the `medal-x86_64-linux-musl` and Windows `medal.exe` binaries:

- `bot2/node` — Node.js Discord bot with `.decomp` command and keepalive HTTP server
- `bot2/python` — Python Discord bot with `.decomp` command and keepalive HTTP server

Both systems are designed to work on platforms like Railway and Render using Docker.

## How it works

- The bot listens for `.decomp` command messages on Discord.
- Supports attached bytecode files or Base64 payloads.
- Uses `medal.exe` or `medal-x86_64-linux-musl` to run decompilation.
- Includes a keepalive HTTP endpoint at `/` for platform health checks.

## Docker deployment

Build the Node bot:

```bash
docker build -f bot2/node/Dockerfile . -t medal-bot2-node
```

Build the Python bot:

```bash
docker build -f bot2/python/Dockerfile . -t medal-bot2-python
```

Run either image:

```bash
docker run -e DISCORD_TOKEN=your_token -e PORT=3000 -p 3000:3000 medal-bot2-node
```

```bash
docker run -e DISCORD_TOKEN=your_token -e PORT=3000 -p 3000:3000 medal-bot2-python
```

## Notes for Render / Railway

- Expose and bind the `PORT` environment variable.
- Ensure the `medal.exe` and/or `medal-x86_64-linux-musl` binary is included in the Docker image.
- Use `.env` files only for local development; in production, set secrets through the platform.
