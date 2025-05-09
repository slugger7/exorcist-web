/** @import { Library, LibraryPath } from "../types/index" */
import { server } from "../env.js";
import { fetch } from "./fetch.js";

/**
 * @returns {Promise<[Library]>}
 */
export const getLibraries = async () => {
  const res = await fetch(`${server()}/libraries`);

  if (res.status != 200) {
    console.log("could not get routes");
  }

  return await res.json()
};

/**
 * @param {string} name
 * @returns {Promise<Library>}
 */
export const create = async (name) => {
  const res = await fetch(
    `${server()}/libraries`,
    { method: "POST", body: JSON.stringify({ name }) }
  );

  return await res.json()
}

/**
 * @param {string} id
 * @returns {Promise<[LibraryPath]>}
 */
export const getPaths = async (id) => {
  const res = await fetch(
    `${server()}/libraries/${id}/libraryPaths`
  )

  return await res.json()
}
