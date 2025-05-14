import { ws } from "../env"
import { tryParseIntOrDefault } from "../parsing"
import { jobsState } from "../state/jobState.svelte"

const heartbeat = tryParseIntOrDefault(import.meta.env.VITE_WEBSOCKET_HEARTBEAT, 30000)
const pingTime = heartbeat * 9 / 10
const pongTime = heartbeat

const topics = {
	"job_update": (job) => {
		jobsState.page.data = jobsState.page.data.map(j => {
			if (j.id === job.id) {
				// check to make sure this update is newer than the current job
				return job
			}
			return j
		})
	},
	"job_create": (job) => {
		jobsState.page.total = jobsState.page.total + 1
		jobsState.page.data.push(job)
	}
}

/** @type {WebSocket} */
let conn
let pingInterval
let pongTimeout

window.addEventListener("beforeunload", () => {
	if (conn) {
		conn.close()
	}
	clearInterval(pingInterval)
	clearTimeout(pongTimeout)
})

export const setupWebsocket = () => {
	const connect = () => {
		try {
			conn = new WebSocket(`${ws()}/ws`)

			conn.addEventListener("open", onOpen)
			conn.addEventListener("close", onClose)
			conn.addEventListener("message", onMessage)
			conn.addEventListener("error", onError)
		} catch (e) {
			console.error("could not open websocket to server", e)
			conn == null
		}
	}

	const onClose = (evt) => {
		console.warn("Websocket connection closed")
		clearInterval(pingInterval)
		clearTimeout(pongTimeout)
		connect()
	}

	const onMessage = (evt) => {
		if (evt.data == "pong") {
			console.debug("pong")
			pong()
			return
		}
		/** @type {{topic: string, data: any}} */
		const data = JSON.parse(evt.data)
		const topic = topics[data.topic]
		if (topic) {
			topic(data.data)
		}
	}

	const onOpen = (evt) => {
		console.info("Websoceket opened")
		ping()
		pong()
	}

	const onError = (evt) => {
		console.error(evt)
	}

	const ping = () => {
		pingInterval = setInterval(() => {
			console.debug("ping")
			if (conn && conn.readyState !== WebSocket.CLOSED) {
				try {
					conn.send("ping")
				} catch (e) {
					console.error("error sending ping on websocket", e)
				}
			}
		}, pingTime)
	}

	const pong = () => {
		clearTimeout(pongTimeout)
		pongTimeout = setTimeout(() => {
			console.warn("Timeout reached, recreating websocket if possible")
			clearInterval(pingInterval)
			clearTimeout(pongTimeout)
			conn.close()
			connect()
		}, pongTime)
	}

	connect()
}