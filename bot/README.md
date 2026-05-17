# Medal Bot Systems

This folder contains two ready-to-run bot systems that wrap the `medal-x86_64-linux-musl` decompiler binary.

You can choose either:

- `bot/node` — a Discord bot implemented in Node.js
- `bot/python` — a Discord bot implemented in Python

Both systems expose a keepalive HTTP server and support the `.decomp` command.

## Command

Both bots listen for messages starting with:

```text
.decomp
```

Supported options:

- `.decomp --lua51` — decompile Lua 5.1 bytecode
- `.decomp` with an attached file or Base64 payload

## Deployment

Both bot implementations include Docker configuration for platforms like Railway or Render. Build them from the repo root so the root-level `medal-x86_64-linux-musl` binary is included in the image.

Examples:

```bash
docker build -f bot/node/Dockerfile . -t medal-bot-node
```

```bash
docker build -f bot/python/Dockerfile . -t medal-bot-python
```
