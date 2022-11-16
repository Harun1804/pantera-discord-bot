const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interation) {
		await interation.reply(`This command was run by ${interation.user.username}, who joined on ${interation.member.joinedAt}`);
	},
};