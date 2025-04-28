import { server } from '../env.js'
import { fetch } from './fetch.js'

/**
 * @import { Video } from "../types/models.js"
 * @returns {Promise<[Video]>}
 */
export const getVideos = async () => {
  const res = await fetch(`${server()}/videos`)

  return await res.json()
}