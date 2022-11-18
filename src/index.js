import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import { config } from 'dotenv';

config();
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENTID;
const GUILD_ID = process.env.DISCORD_GUILDID;
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const rest = new REST({ version : '10'}).setToken(TOKEN)

async function main(){
  const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
  ];

  try {
    client.login(TOKEN);
    client.on('ready', () => console.log(`${client.user.tag} Has logged in!`));
    
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    client.on('interactionCreate', async interaction => {
      if (!interaction.isChatInputCommand()) return;

      if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
      }
    });
  } catch (err) {
    console.log(err);
  }
}
main();