import { navigate } from 'svelte-routing'

export function monkeyPatchFetch() {
  const { fetch: originalFetch } = window

  window.fetch = async (resource, config) => {
    if (!config) {
      config = { credentials: "include" }
    }
    if (config.credentials === undefined || config.credentials === null) {
      config.credentials = "include"
    }

    const response = await originalFetch(resource, config);

    if (response.status == 401) {
      navigate(`/login?returnUrl=${encodeURIComponent(window.location.pathname)}`)
    }

    return response;
  }
}