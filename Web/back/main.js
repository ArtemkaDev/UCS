// Configuration
const {config} = require('./modules/config')
require('dotenv').config()
const yargs = require('yargs')
config.DsTokens = `${yargs.argv.discord}`

// Discord
const { Discord } = require('./modules/discord')


// Website
const express = require('express')

