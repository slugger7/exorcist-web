import { server } from "../env";

/**
 * @param {string} id 
 * @returns {string}
 */
export const imageUrlById = (id) => `${server()}/media/image/${id}`