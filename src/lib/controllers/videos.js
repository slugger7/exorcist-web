/** @import { Page, Video } from "../types" */
import { server } from '../env.js'
import { fetch } from './fetch.js'

/**
 * @param {number} [page]
 * @param {number} [limit]
 * @param {string} [search]
 * @returns {Promise<Page<Video>>}
 */
export const getVideos = async (page = 1, limit = 48, search = "") => {
  const params = new URLSearchParams()
  params.set("skip", ((page - 1) * limit).toString())
  params.set("limit", limit.toString())

  if (search !== "") {
    params.set("search", search)
  }

  const res = await fetch(`${server()}/videos?${params.toString()}`)

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