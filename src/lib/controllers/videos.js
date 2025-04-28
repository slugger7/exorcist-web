import { server } from '../env.js'
import { fetch } from './fetch.js'

export const getVideos = async () => {
  const res = await fetch(`${server()}/videos`)

  return await res.json()
}