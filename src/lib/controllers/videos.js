/** @import { Page, Video } from "../types" */
import { server } from '../env.js'
import { fetch } from './fetch.js'

/**
 * @returns {Promise<Page<Video>>}
 */
export const getVideos = async (page = 1, limit = 48) => {
  const res = await fetch(`${server()}/videos?skip=${(page - 1) * limit}&limit=${limit}`)

  return await res.json()
}