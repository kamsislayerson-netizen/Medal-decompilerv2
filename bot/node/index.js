import { Client, GatewayIntentBits, Partials, Events } from 'discord.js';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { spawn } from 'child_process';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const PORT = Number(process.env.PORT || 3000);
const MEDAL_BINARY = process.env.MEDAL_BINARY || './medal-x86_64-linux-musl';

if (!DISCORD_TOKEN) {
  console.error('DISCORD_TOKEN is required');
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Channel],
});

const app = express();
app.use(express.json());
app.get('/', (req, res) => res.send('Medal Discord bot is alive'));
app.listen(PORT, () => console.log(`Keep-alive server running on port ${PORT}`));

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}`);
});

async function runDecompiler(inputPath, outputPath, lua51) {
  return new Promise((resolve, reject) => {
    const args = ['decompile', '-i', inputPath, '-o', outputPath];
    if (lua51) args.push('--lua51');

    const child = spawn(MEDAL_BINARY, args, { stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve(outputPath);
      else reject(new Error(`medal exited with ${code}`));
    });
  });
}

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot || !message.content.startsWith('.decomp')) return;

  const args = message.content.split(/\s+/).slice(1);
  const lua51 = args.includes('--lua51');
  const reply = await message.channel.send('Decompiling...');

  try {
    let bytecode = null;
    const bytecodeAttachment = message.attachments.find((a) => a.size > 0);
    if (bytecodeAttachment) {
      const fileResponse = await fetch(bytecodeAttachment.url);
      const arrayBuffer = await fileResponse.arrayBuffer();
      bytecode = Buffer.from(arrayBuffer);
    } else {
      const textContent = args.filter((arg) => arg !== '--lua51').join(' ').trim();
      if (textContent.length > 0) {
        bytecode = Buffer.from(textContent, 'utf8');
      }
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
