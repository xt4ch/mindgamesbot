import { Client } from 'discord.js'
import { readdir } from 'node:fs/promises'

export class DiscordClient extends Client {
	#token

	constructor ({ token, intents }) {
		super({ intents })
		this.#token = token
	}

	#loadEvents = async events => events.map(e => import(`#src/events/${e}`).then(({ default: event }) => this.on(event.name, async (...args) => event.listener(this, ...args).catch(e => console.error(e))))) // eslint-disable-line

	async login () {
		const events = (await readdir('src/events')).filter(f => f.endsWith('.js'))
		await this.#loadEvents(events)
		await super.login(this.#token)
		return this
	}
}