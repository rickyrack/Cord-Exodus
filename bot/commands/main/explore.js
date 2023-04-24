const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');
const { explore } = require('../../../backend/firestore/main/explore');
const { userCheck } = require('../../../backend/firestore/utility/user_check');
const { addResource } = require('../../../backend/firestore/utility/add_resource');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('explore')
		.setDescription('Explore your surroundings for items and more.'),
	async execute(interaction) {
		const user = interaction.user;

		if(!await userCheck(user)) {
			return interaction.reply("Use /start");
		}

		const resources = await explore();
		const amtModifier = 1;

		const randomSelect = Math.floor(Math.random() * resources.length);
		console.log(resources[randomSelect].id);

		const result = resources[randomSelect];

		// needs add resource function
		const added = await addResource(result.id, user.id);

		if(!added) {
			return interaction.reply('Epic! You found a bug :*(')
		}

		const exploreEmbed = new EmbedBuilder()
			.setTitle(`You found [${result.name}]`)
		return interaction.reply({ embeds: [exploreEmbed] });
	},
};