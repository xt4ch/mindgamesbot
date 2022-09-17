import { ReadyEvent } from '#lib/classes/ready'

export default {
	name: 'ready',
	listener: async client => {
		console.log(`Logged as ${client.user.username}`)
		return new ReadyEvent(client).resolver()
	}
}