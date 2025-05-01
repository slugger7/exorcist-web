import { server } from "../env";

export const imageUrlById = (id) => `${server()}/media/image/${id}`