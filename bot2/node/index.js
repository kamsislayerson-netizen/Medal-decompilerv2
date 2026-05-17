import { config } from 'dotenv';
import express from 'express';
import { Client, GatewayIntentBits, Partials, Events } from 'discord.js';
import { spawn } from 'child_process';
import fs from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const PORT = Number(process.env.PORT || 3000);
const MEDAL_BINARY = process.env.MEDAL_BINARY || './medal-x86_64-linux-musl';

if (!DISCORD_TOKEN) {
  console.error('DISCORD_TOKEN is required');
  process.exit(1);
}

const app = express();
app.get('/', (req, res) => res.send('Medal bot2 Node is alive'));
app.listen(PORT, () => console.log(`Keepalive server running on port ${PORT}`));

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Channel],
});

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}`);
});

function runDecompiler(inputPath, outputPath, lua51) {
  return new Promise((resolvePromise, reject) => {
    const args = ['decompile', '-i', inputPath, '-o', outputPath];
    if (lua51) args.push('--lua51');

    const child = spawn(MEDAL_BINARY, args, { stdio: 'pipe' });
    let stderr = '';
    child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });

    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolvePromise(outputPath);
      else reject(new Error(`medal exited with ${code}: ${stderr}`));
    });
  });
}

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot || !message.content.startsWith('.decomp')) return;

  const rawArgs = message.content.slice('.decomp'.length).trim();
  const cliArgs = rawArgs.split(/\s+/).filter(Boolean);
  const lua51 = cliArgs.includes('--lua51');
  const payloadText = cliArgs.filter((arg) => arg !== '--lua51').join(' ').trim();

  const reply = await message.channel.send('Decompiling...');

  try {
    let bytecode = null;
    if (message.attachments.size > 0) {
      const attachment = message.attachments.first();
      const response = await fetch(attachment.url);
      const buffer = await response.arrayBuffer();
      bytecode = Buffer.from(buffer);
    } else if (payloadText.length > 0) {
      bytecode = Buffer.from(payloadText, 'utf8');
    }

    if (!bytecode || bytecode.length === 0) {
      await reply.edit('Please attach a bytecode file or paste Base64-encoded bytecode with `.decomp`.');
      return;
    }

    const tmpDir = resolve(__dirname, 'tmp');
    fs.mkdirSync(tmpDir, { recursive: true });
    const inputPath = resolve(tmpDir, `input-${Date.now()}.bin`);
    const outputPath = resolve(tmpDir, `output-${Date.now()}.lua`);
    fs.writeFileSync(inputPath, bytecode);

    await runDecompiler(inputPath, outputPath, lua51);
    await message.channel.send({ content: 'Decompiled output:', files: [outputPath] });
    await reply.delete();
  } catch (error) {
    console.error(error);
    await reply.edit(`Decompilation failed: ${error.message}`);
  }
});

client.login(DISCORD_TOKEN);
