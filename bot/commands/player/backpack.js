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



        const message = await interaction.reply({ embeds: [backpackEmbed], fetchReply: true });
        message.react("1100250570666803200"); // back
        message.react("1100250571669241916"); // next
        message.react("1100250572965290104"); // 1
        message.react("1100250573820932116"); // 2
        message.react("1100250574735290448"); // 3
        message.react("1100250575699976263"); // 4
        message.react("1100250577054736495"); // 5
        message.react("1100250578422075542"); // 6
        message.react("1100250616061763584"); // 7
        message.react("1100250617647206510"); // 8
        message.react("1100250618574143519"); // 9
        message.react("1100250619358494720"); // 10


    },
};