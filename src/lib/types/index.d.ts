import type { Job } from "./job";

// https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
export * from "./job"
export * from "./library"

export type LoginResult = {
  userId: string;
  username: string;
}

export type WSTopicEnum =
  | "job_update"
  | "job_create"
  | "video_create"
  | "video_update"
  | "video_delete"

export type WSTopicMap<T> = {
  [key in WSTopicEnum]?: (data: T) => void
}

export type WSMessage<T> = {
  topic: WSTopicEnum
  data: T
}

export type Item = {
  id: string
  name: string
}