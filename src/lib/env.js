export const server = () =>
  `${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_HOSTNAME}:${import.meta.env.VITE_SERVER_PORT}`;
