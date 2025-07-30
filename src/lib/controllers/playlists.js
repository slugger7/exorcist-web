/** @import { PlaylistDTO } from "../types" */
import { server } from "../env";
import { fetch } from "./fetch";

/** @returns {Promise<PlaylistDTO[]>}*/
export const get = async () => {
  const res = await fetch(`${server()}/playlists`)

  return await res.json()
}