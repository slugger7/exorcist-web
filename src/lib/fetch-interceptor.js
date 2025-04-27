import { navigate } from 'svelte-routing'

export function monkeyPatchFetch() {
  const { fetch: originalFetch } = window

  window.fetch = async (resource, config) => {
    const response = await originalFetch(resource, config);

    if (response.status == 401) {
      navigate(`/login?returnUrl=${encodeURIComponent(window.location.pathname)}`)
    }

    return response;
  }
}