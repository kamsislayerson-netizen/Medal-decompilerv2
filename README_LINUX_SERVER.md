# Medal Linux Server Usage

This guide explains how to use the compiled `medal-x86_64-linux-musl` binary to decompile Lua 5.1 bytecode on a Linux server or container platform such as Railway.

## Binary

The compiled binary is available at:

```bash
./medal-x86_64-linux-musl
```

It is a statically linked `x86_64-unknown-linux-musl` binary suitable for portable Linux deployment.

## Local CLI Usage for Lua 5.1

To decompile a Lua 5.1 bytecode file from the command line:

```bash
./medal-x86_64-linux-musl decompile -i input.bytecode -o output.lua --lua51
```

The input file may contain raw bytecode or Base64-encoded bytecode. The output file will contain the decompiled Lua source.

## Run as a Simple Web Server

To run the decompiler as an HTTP service that accepts Lua 5.1 bytecode:

```bash
./medal-x86_64-linux-musl serve --port 3000 --lua51
```

This starts a server that listens on port `3000` and exposes the endpoint:

- `POST /lua51/decompile`

### Railway / Container Notes

On Railway or other Linux containers, ports are often provided via the `PORT` environment variable. Use the `PORT` value when starting the service:

```bash
PORT=${PORT:-3000}
./medal-x86_64-linux-musl serve --port "$PORT" --lua51
```

If you use a Dockerfile or service configuration, make sure the container exposes the same port and the start command uses the `PORT` environment variable.

## Example: Decompile with `curl`

### Raw bytecode

```bash
curl -X POST \
  --data-binary @input.bytecode \
  http://localhost:3000/lua51/decompile
```

### Base64-encoded bytecode

```bash
base64 input.bytecode | curl -X POST \
  --data-binary @- \
  http://localhost:3000/lua51/decompile
```

The server automatically detects Base64 input and decodes it before decompilation.

## Recommended Railway Setup

1. Upload or include `medal-x86_64-linux-musl` in your repository.
2. Use a `start` command such as:

```bash
./medal-x86_64-linux-musl serve --port "$PORT" --lua51
```

3. Ensure Railway exposes the port the app listens on.
4. Send bytecode to `http://<your-service-url>/lua51/decompile`.

## Notes

- `--lua51` is required for Lua 5.1 decompilation.
- The server also supports Luau decompilation if you add `--luau`, but for Lua 5.1 only the `/lua51/decompile` endpoint is required.
- If you want a static asset or API health check, the service also provides `/health` and `/ping`.
