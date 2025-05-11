import { ws } from "../env"

const heartbeat = 10000
const pingTime = heartbeat * 9 / 10
const pongTime = heartbeat

export const setupWebsocket = () => {
	const conn = new WebSocket(`${ws()}/ws`)
	let pingInterval
	let pongTimeout

	conn.onclose = (evt) => {
		console.warn("Websocket connection closed")
	}

	conn.onmessage = (evt) => {
		if (evt.data == "pong") {
			console.debug("pong")
			pong()
			return
		}
		const data = JSON.parse(evt.data)
		console.log({ data })
	}

	conn.onopen = (evt) => {
		console.info("Websoceket opened")
	}

	conn.onerror = (evt) => {
		console.error(evt)
	}

	const ping = () => {
		pingInterval = setInterval(() => {
			console.debug("ping")
			conn.send("ping")
		}, pingTime)
	}

	const pong = () => {
		clearTimeout(pongTimeout)
		pongTimeout = setTimeout(() => {
			console.warn("Timeout reached, recreating websocket if possible")
			clearInterval(pingInterval)
			clearTimeout(pongTimeout)
			conn.close()
			setupWebsocket()
		}, pongTime)
	}

	ping()
	pong()
}