import type { Job } from "./job";

// https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
export * from "./job"
export * from "./library"

export type Video = {
  id: string;
  title: string;
  path: string;
  thumbnailId: string
}

export type LoginResult = {
  userId: string;
  username: string;
}

export type Page<T> = {
  data: T[],
  limit: number,
  skip: number,
  total: number
}

export type WSTopicEnum =
| "job_update"
| "job_create"

export type WSTopicData = | Job

export type WSMessage = {
  topic: WSTopicEnum
  data: WSTopicData
}