const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Replies with Start!'),
	async execute(interaction) {
		return interaction.reply('Start!');
	},
};