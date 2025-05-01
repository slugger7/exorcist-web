/** @import { Page, Video } from "../types/index" */
import { server } from '../env.js'
import { fetch } from './fetch.js'

/**
 * @returns {Promise<Page<Video>>}
 */
export const getVideos = async () => {
  const res = await fetch(`${server()}/videos`)

  return await res.json()
}