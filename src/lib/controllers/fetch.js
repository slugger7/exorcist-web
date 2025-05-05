import { navigate } from 'svelte-routing'

/**
 * @param {string} resource 
 * @param {RequestInit} config 
 * @returns {Promise<Response>}
 */
export async function fetch(resource, config = null) {
  if (!config) {
    config = { credentials: "include" }
  }
  if (config.credentials === undefined || config.credentials === null) {
    config.credentials = "include"
  }
const actualFetch = async () => await window.fetch(resource, config);

   /** @type {Response} */
  let response
  if (import.meta.env.DEV) {
    const mocks = await import("./mocks")
   
    return await mocks.mock(resource, actualFetch)
  } else {
    response = await actualFetch()
  }

  if (response.status == 401) {
    navigate(`/login?returnUrl=${encodeURIComponent(window.location.pathname)}${window.location.search}`)
  }

  return response;
}