# Lua 5.1 Decompiling

This guide explains how to use the `medal` decompiler to work with Lua 5.1 bytecode.

## Binary

Use one of the compiled binaries in the repository root:

```bash
./medal-x86_64-linux-musl
```

If you built a native GNU/Linux binary during development, you can also use:

```bash
./medal-native
```

## CLI Usage

To decompile a Lua 5.1 bytecode file:

```bash
./medal-x86_64-linux-musl decompile -i input.bytecode -o output.lua --lua51
```

- `-i input.bytecode`: path to the input bytecode file
- `-o output.lua`: path to write the decompiled Lua source
- `--lua51`: tells the tool to treat the input as Lua 5.1 bytecode

The input file may be raw bytecode or Base64-encoded bytecode.

## Serve Mode

You can also run the decompiler as a simple HTTP server:

```bash
./medal-x86_64-linux-musl serve --port 3000 --lua51
```

This starts a local web service with the Lua 5.1 endpoint:

- `POST /lua51/decompile`

### Example requests

#### Raw bytecode

```bash
curl -X POST --data-binary @input.bytecode http://localhost:3000/lua51/decompile
```

#### Base64-encoded bytecode

```bash
base64 input.bytecode | curl -X POST --data-binary @- http://localhost:3000/lua51/decompile
```

The service detects Base64 automatically and decodes it before decompiling.

## Notes

- `--lua51` is required for Lua 5.1 decompilation.
- The server also supports Luau bytecode if `--luau` is enabled, but Lua 5.1 requests should use `/lua51/decompile`.
- If your workspace has a `./medal` directory instead of an executable, use the explicit binary names, such as `./medal-x86_64-linux-musl` or `./medal-native`.
