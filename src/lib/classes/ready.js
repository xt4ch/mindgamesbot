import got from 'got'

export class ReadyEvent {
	#client

	constructor (client) {
		this.#client = client
		this.gameServerIp = process.env.GAME_SERVER_IP
		this.gameServerPort = process.env.GAME_SERVER_PORT
		this.steamApiKey = process.env.STEAM_API_KEY
	}

	#getPlayers = async () => got('IGameServersService/GetServerList/v1/', {
		prefixUrl: 'https://api.steampowered.com/',
		searchParams: {
			filter: `\\appid\\221100\\gameaddr\\${this.gameServerIp}:${this.gameServerPort}`,
			key: this.steamApiKey
		}
	}).json().then(({ response }) => response).then(res => ({ players: res?.servers?.[0]?.players, maxPlayers: res?.servers?.[0]?.max_players }))

	#updateClientPresence = async () => {
		setTimeout(async () => this.#updateClientPresence(), 300000)
		const { players, maxPlayers } = await this.#getPlayers()

		this.#client.user.setPresence({
			activities: [{ name: `${players !== undefined && maxPlayers !== undefined ? `Онлайн ${players}/${maxPlayers}` : 'Сервер выключен'}` }]
		})
	}

	async resolver () {
		if (!this.#client) throw new Error('Ready event emit, but client undefinded')

		await this.#updateClientPresence()
	}
}