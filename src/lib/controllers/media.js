/** @import { PageDTO, MediaDTO, MediaOverviewDTO } from "../../dto" */
import { server } from '../env.js'
import { fetch } from './fetch.js'

/**
 * @param {number} [page]
 * @param {number} [limit]
 * @param {string} [search]
 * @param {string} [orderBy]
 * @param {boolean} [ascending]
 * @returns {Promise<PageDTO<MediaOverviewDTO>>}
 */
export const getAll = async (page = 1, limit = 48, search = "", orderBy = "", ascending = true) => {
  const params = new URLSearchParams()
  params.set("skip", ((page - 1) * limit).toString())
  params.set("limit", limit.toString())
  params.set("asc", ascending.toString())

  if (search !== "") {
    params.set("search", search)
  }

  if (orderBy !== "") {
    params.set("orderBy", orderBy)
  }

  const res = await fetch(`${server()}/media?${params.toString()}`)

  return await res.json()
}

/**
 * @param {string} id 
 * @returns {string}
 */
export const videoUrlById = (id) => `${server()}/videos/${id}`

/**
 * @param {string} id
 * @returns {Promise<MediaDTO>}
 */
export const get = async (id) => {
  const res = await fetch(
    `${server()}/media/${id}`
  )

  return await res.json()
}

export const ordinals = [
  {
    text: "Added",
    value: "added"
  },
  {
    text: "Created",
    value: "created"
  },
  {
    text: "Modified",
    value: "modified"
  },
  {
    text: "Title",
    value: "title"
  },
  {
    text: "Size",
    value: "size"
  },
  {
    text: "Runtime",
    value: "runtime"
  },
]