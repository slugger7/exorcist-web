/**
 * @import { MediaOverviewDTO, PageDTO, PersonDTO } from "../../dto"
 */
import { server } from "../env";
import { fetch } from "./fetch";

/** @returns {Promise<PersonDTO[]>} */
export const getAll = async () => {
  const res = await fetch(`${server()}/people`)

  return await res.json()
}

export const remove = async (mediaId, personId) => {
  const res = await fetch(`${server()}/media/${mediaId}/people/${personId}`, { method: "DELETE" })

  return res.ok
}

export const add = async (mediaId, personId) => {
  const res = await fetch(`${server()}/media/${mediaId}/people/${personId}`, { method: "PUT" })

  return await res.json()
}

/** @param {string[]} peopleNames */
export const create = async (peopleNames) => {
  const res = await fetch(`${server()}/people`, { method: "POST", body: JSON.stringify(peopleNames) })

  return await res.json()
}

/**
 * @param {string} id 
 * @param {URLSearchParams} params 
 * @returns {Promise<PageDTO<MediaOverviewDTO>>}
 */
export const getMediaWithParams = async (id, params = new URLSearchParams()) => {
  const res = await fetch(`${server()}/people/${id}/media?${params.toString()}`)

  return await res.json()
}

