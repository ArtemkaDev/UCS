const { Client, Intents, Collection } = require("discord.js")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const fs = require("fs")
const { ready } = require("../modules/event")


class discord {
    constructor(TOKEN) {
        this.client = new Client({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES
            ]
        })

        this.commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))
        this.commands = []
        this.client.commands = new Collection()

        for (const file of this.commandFiles) {
            this.command = require(`./commands/${file}`)
            this.commands.push(this.command.data.toJSON())

            this.client.commands.set(this.command.data.name, command)
        }

        this.client.on("ready", async () => {       
            const CLIENT_ID = this.client.user.id
        
            this.rest = new REST({
                version: "9",
            }).setToken(process.env.TOKEN);
            try {
                if (process.env.ENV === "production"){
                    await this.rest.put(Routes.applicationCommands(CLIENT_ID), {
                        body: this.commands
                    })
                } else {
                    await this.rest.put(Routes.applicationCommands(CLIENT_ID, process.env.CLIENT_ID), {
                        body: this.commands
                    })
                }
                await ready("discord", "rest", true)
            } catch (e) {
                await require("../modules/error")(e)
                await ready("discord", "rest", false)
            }
            await ready("discord", "main", true)
        })
        
        
        this.client.on("interactionCreate", async interaction => {
            if (!interaction.isCommand()) return;
        
            const command = this.client.commands.get(interaction.commandName);
            if (!command) reutrn;
        
            try {
                await this.command.execute(interaction, this.client)
            } catch (e) {
                if (e) console.error(e);
                interaction.reply({
                    content: "Козаче! Щось пішло не так...",
                    ephemeral: true
                })
            }
        })

        this.client.login(TOKEN)
    }
}

module.exports = { discord }