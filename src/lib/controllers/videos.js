import { server } from '../env.js'

export const getVideos = async () => {
  const res = await fetch(`${server()}/videos`)

  return await res.json()
}