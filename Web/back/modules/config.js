const { discord } = require("../discord/discord");
const hash = require("./hash")
const event = require("./event")

if (hash.checker("85c6662939e668f30c98fe5a03143ff0")) {
  event.ready("hash", "token", true);
} else {
  event.ready("hash", "token", false);
}

module.exports = {
  Discord: new discord(
    hash.decode(
      process.env.DISCORD_TOKEN
    )
  ),
};
