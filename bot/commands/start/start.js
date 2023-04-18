const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');
const { start } = require('../../../backend/firestore/start/start');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Enter the wasteland...'),
	async execute(interaction) {
        await start(interaction.user);
        const startEmbed = new EmbedBuilder()
            .setTitle("Cord Exodus")
            .setDescription("You're in the wasteland, try /explore")
            .setImage("https://i.imgur.com/OgIlXd9.png")
		return interaction.reply({ embeds: [startEmbed] });
	},
};