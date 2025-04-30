/** @import {LibraryPath} from "../types/models" */
import { server } from "../env"
import { fetch } from "./fetch"

/**
 * @param {string} libraryId
 * @param {string} path
 * @returns {Promise<LibraryPath>}
 */
export const create = async (libraryId, path) => {
  const res = await fetch(
    `${server()}/libraryPaths`,
    { method: "POST", body: JSON.stringify({ libraryId, path }) }
  )

  return await res.json()
}

