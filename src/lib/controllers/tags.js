/**
 * @import { TagDTO } from "../../dto"
 */
import { server } from "../env";
import { fetch } from "./fetch";

/**
 * @returns {Promise<TagDTO[]>}
 */
export const getAll = async () => {
  const res = await fetch(`${server()}/tags`)

  return await res.json()
}

export const remove = async (mediaId, tagId) => {
  const res = await fetch(`${server()}/media/${mediaId}/tags/${tagId}`, {method: "DELETE"})

  return await res.json()
}