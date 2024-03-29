const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require('discord.js')
const cooldown = new Set()

module.exports = {
    // https://discordjs.guide/slash-commands/advanced-creation.html#localizations
    data: new SlashCommandBuilder()
        .setName("ping")
        .setNameLocalizations({
            uk: "пінг"
        })
        .setDescription("Показати затримку між повідомленнями")
        .setDescriptionLocalizations({
            "en-US": "Show delay between messages",
            "en-GB": "Show delay between messages",
        }),
    async execute(interaction, client){
        let colorpal = ["90be6d", "f9c74f", "f8961e", "f94144"]
        let coloring = 0
        if (cooldown.has(interaction.user.id)) {
            interaction.reply({ content: "Очікуйте доступа команди", ephemeral: true });

        } else {
            let timeleft = Date.now() - interaction.createdTimestamp
            if (Math.sign(timeleft) === -1){
                timeleft = interaction.createdTimestamp - Date.now()
            }
            if (timeleft > 500){coloring += 1}
            if (timeleft > 1000){coloring += 1}
            if (timeleft > 5000){coloring += 1}
            interaction.reply({embeds: [
                    new MessageEmbed()
                        .setColor(colorpal[coloring])
                        .setDescription(`Затримка між повідомленнями: ${timeleft}ms.\nЗатримка Discord API: ${Math.round(client.ws.ping)}ms`)
                ]}
            )
            cooldown.add(interaction.user.id);
            setTimeout(() => {
                cooldown.delete(interaction.user.id);
            }, 1000);
        }
    }
}