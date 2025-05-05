import {resolveResource} from "./resolver"
/**
 * @typedef defaultFunc
 * @type {Function}
 * @returns {Promise<Response>}
 */

/**
 * @param {string} resource 
 * @param {defaultFunc} defalutFn 
 * @returns {Promise<Response>}
 */
export const mock = async (resource, defalutFn) => {
    let response = resolveResource(resource)
    if (!response) {
        response = await defalutFn()
    }
    return response
}