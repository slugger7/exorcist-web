/**
 * @import { TagDTO, PageDTO, MediaOverviewDTO } from "../../dto"
 */
import { server } from "../env";
import { fetch } from "./fetch";

/**
 * @param {string} [search]
 * @returns {Promise<TagDTO[]>} */
export const getAll = async (search = "") => {
  const params = new URLSearchParams()

  if (search.length > 0) {
    params.set("search", search)
  }

  return await getAllWithParams(params)
}

/**
 * @param {URLSearchParams} [params]
 * @returns {Promise<TagDTO[]>}
 */
export const getAllWithParams = async (params = new URLSearchParams()) => {
  const res = await fetch(`${server()}/tags`)

  return await res.json()
}
export const remove = async (mediaId, tagId) => {
  const res = await fetch(`${server()}/media/${mediaId}/tags/${tagId}`, { method: "DELETE" })

  return res.ok
}

export const add = async (mediaId, tagId) => {
  const res = await fetch(`${server()}/media/${mediaId}/tags/${tagId}`, { method: "PUT" })

  return await res.json()
}

/** @param {string[]} tagNames */
export const create = async (tagNames) => {
  const res = await fetch(`${server()}/tags`, { method: "POST", body: JSON.stringify(tagNames) })

  return await res.json()
}

/**
 * @param {string} id 
 * @param {URLSearchParams} [params]
 * @returns {Promise<PageDTO<MediaOverviewDTO>>}
 */
export const getMediaWithParams = async (id, params = new URLSearchParams) => {
  const res = await fetch(`${server()}/tags/${id}/media?${params.toString()}`)

  return await res.json()
}