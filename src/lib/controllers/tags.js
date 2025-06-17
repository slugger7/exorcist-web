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