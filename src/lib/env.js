export const server = () => {
  let url = ""
  if (import.meta.env.DEV) {
    url = `${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_HOSTNAME}:${import.meta.env.VITE_SERVER_PORT}`;
  }

  if (import.meta.env.PROD) {
    url = `${window.location.protocol}//${window.location.host}`
  }

  return `${url}/api`
}
