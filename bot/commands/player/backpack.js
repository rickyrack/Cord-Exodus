const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');
const { userCheck } = require('../../../backend/firestore/utility/user_check');
const { getBackpack } = require('../../../backend/firestore/player/get_backpack');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('i')
		.setDescription('Open your backpack.'),
	async execute(interaction) {
		const user = interaction.user;

		if(!await userCheck(user)) {
			return interaction.reply('Use /start')
		}

        const backpack = await getBackpack(user);
        console.log(backpack);

        const backpackEmbed = new EmbedBuilder()
            .setTitle("Backpack")
            .setThumbnail("https://i.imgur.com/Q3ePIAW.png")

        Object.keys(backpack).forEach(item => {
            backpackEmbed.addFields(
                { name: `${backpack[item].name }`, value: `Quantity: ${backpack[item].amt}` }
            )
        })
        return interaction.reply({ embeds: [backpackEmbed] });
    },
};