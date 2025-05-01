// https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
export * from "./job"
export * from "./library"

export type Video = {
  id: string;
  title: string;
  path: string;
  thumbnailPath: string
}

export type LoginResult = {
  userId: string;
  username: string;
}

export type Page<T> = {
  data: [T],
  limit: number,
  skip: number,
  total: number
}