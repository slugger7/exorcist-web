import { navigate } from 'svelte-routing'

export async function fetch(resource, config) {
    if (!config) {
        config = { credentials: "include" }
      }
      if (config.credentials === undefined || config.credentials === null) {
        config.credentials = "include"
      }
  
      const response = await window.fetch(resource, config);
  
      if (response.status == 401) {
        navigate(`/login?returnUrl=${encodeURIComponent(window.location.pathname)}${window.location.search}`)
      }
  
      return response;
}