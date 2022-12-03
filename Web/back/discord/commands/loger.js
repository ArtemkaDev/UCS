const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, PermissionFlags } = require('discord.js')
const { initialized } = require('../../modules/event')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("debug")
        .setDescription("Інформація про backend")
        .setDefaultMemberPermissions(PermissionFlags.ADMINISTRATOR)
        .addUserOption((option) => {
            option
                .setName("select")
                .addChoices([
                    "status",
                    "errors"
                ])
                .setRequired(true)
        }),
    async execute(interaction, client){
        interaction.reply({embeds: [
            new MessageEmbed()
                .setColor("386641")
                .setDescription(`${interaction.choices}`)
        ]})
    }
}