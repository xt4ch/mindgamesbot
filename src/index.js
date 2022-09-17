import 'dotenv/config'

import { DiscordClient } from '#lib/classes/discord-client'

async function main () {
	console.clear()

	const discordClient = new DiscordClient({
		token: process.env.DISCORD_TOKEN,
		intents: process.env.DISCORD_INTENTS
	})

	await discordClient.login()
}

await main()
	.catch(e => console.error(e))

process.on('rejectionHandled', e => console.error(e))
process.on('uncaughtException', e => console.error(e))
process.on('uncaughtExceptionMonitor', e => console.error(e))
process.on('unhandledRejection', e => console.error(e))