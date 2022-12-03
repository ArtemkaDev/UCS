const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require('discord.js')
const cooldown = new Set()

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Показать задержку бота"),
    async execute(interaction, client){
        let colorpal = ["90be6d", "f9c74f", "f8961e", "f94144"]
        let coloring = 0
        if (cooldown.has(interaction.user.id)) {
            interaction.reply({ content: "Ожидайте доступа к команде", ephemeral: true });

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
                        .setDescription(`Задержка: ${timeleft}ms.\nЗадержка Discord API: ${Math.round(client.ws.ping)}ms`)
                ]}
            )
            cooldown.add(interaction.user.id);
            setTimeout(() => {
                cooldown.delete(interaction.user.id);
            }, 1000);
        }
    }
}