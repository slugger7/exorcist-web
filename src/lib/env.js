export const server = () => {
  if (import.meta.env.DEV) {
    return `${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_HOSTNAME}:${import.meta.env.VITE_SERVER_PORT}`;
  }

  if (import.meta.env.PROD) {
    const url = `${window.location.protocol}//${window.location.host}`

    return url
  }
}
