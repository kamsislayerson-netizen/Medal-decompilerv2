import os
import subprocess
import tempfile
import threading
from pathlib import Path
from flask import Flask, request, jsonify, send_file
from dotenv import load_dotenv
import discord
from discord.ext import commands

load_dotenv('.env')

DISCORD_TOKEN = os.getenv('DISCORD_TOKEN')
PORT = int(os.getenv('PORT', '3000'))
MEDAL_BINARY = os.getenv('MEDAL_BINARY', './medal-x86_64-linux-musl')

if not DISCORD_TOKEN:
    raise RuntimeError('DISCORD_TOKEN is required')

app = Flask(__name__)


def decompile_bytecode(input_path: Path, output_path: Path, lua51: bool) -> None:
    args = [MEDAL_BINARY, 'decompile', '-i', str(input_path), '-o', str(output_path)]
    if lua51:
        args.append('--lua51')
    result = subprocess.run(args, capture_output=True)
    if result.returncode != 0:
        raise RuntimeError(result.stderr.decode('utf-8', errors='ignore'))


@app.route('/')
def root():
    return 'Medal Python bot keepalive is running.'


@app.route('/decompile', methods=['POST'])
def web_decompile():
    lua51 = request.args.get('lua51', 'false').lower() == 'true'
    content = request.data
    if not content:
        return jsonify({'error': 'No data provided'}), 400

    with tempfile.NamedTemporaryFile(delete=False) as input_file:
        input_file.write(content)
        input_path = Path(input_file.name)

    output_path = Path(tempfile.mktemp(suffix='.lua'))

    try:
        decompile_bytecode(input_path, output_path, lua51)
        return send_file(output_path, as_attachment=True, download_name='output.lua')
    finally:
        if input_path.exists():
            input_path.unlink(missing_ok=True)
        if output_path.exists():
            output_path.unlink(missing_ok=True)


intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix='.', intents=intents)


@bot.command(name='decomp')
async def decomp(ctx, *, args=''):
    lua51 = '--lua51' in args
    bytecode = None
    if ctx.message.attachments:
        attachment = ctx.message.attachments[0]
        bytecode = await attachment.read()
    else:
        text_content = args.replace('--lua51', '').strip()
        if text_content:
            bytecode = text_content.encode('utf-8')

    if not bytecode:
        await ctx.send('Attach the bytecode file or provide Base64 text with `.decomp`.')
        return

    with tempfile.NamedTemporaryFile(delete=False) as input_file:
        input_file.write(bytecode)
        input_path = Path(input_file.name)

    output_path = Path(tempfile.mktemp(suffix='.lua'))

    try:
        decompile_bytecode(input_path, output_path, lua51)
        await ctx.send(file=discord.File(str(output_path), filename='output.lua'))
    except Exception as exc:
        await ctx.send(f'Decompilation failed: {exc}')
    finally:
        if input_path.exists():
            input_path.unlink(missing_ok=True)
        if output_path.exists():
            output_path.unlink(missing_ok=True)


def run_flask():
    app.run(host='0.0.0.0', port=PORT)


if __name__ == '__main__':
    flask_thread = threading.Thread(target=run_flask, daemon=True)
    flask_thread.start()
    bot.run(DISCORD_TOKEN)
