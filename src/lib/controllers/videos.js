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

/**
 * @param {string} id 
 * @returns {string}
 */
export const videoUrlById = (id) => `${server()}/media/video/${id}`

/**
 * @param {string} id
 * @returns {Promise<Video>}
 */
export const get = async (id) => {
  const res = await fetch(
    `${server()}/videos/${id}`
  )

  return await res.json()
}