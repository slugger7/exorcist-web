/** @import { MediaOverviewDTO, PageDTO, PlaylistDTO } from "../types" */
import { server } from "../env";
import { fetch } from "./fetch";

/** @returns {Promise<PlaylistDTO[]>}*/
export const get = async () => {
  const res = await fetch(`${server()}/playlists`)

  return await res.json()
}

/**
 * @param {string} id
 * @param {URLSearchParams} [params]
 * @returns {Promise<PageDTO, MediaOverviewDTO>}
 */
export const getMediaWithParams = async (id, params = new URLSearchParams) => {
  const res = await fetch(`${server()}/playlists/${id}/media?${params.toString()}`)

  return await res.json()
}