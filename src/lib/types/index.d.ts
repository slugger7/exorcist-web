import type { Job } from "./job";
import type { WSTopicAllValues } from "../../dto"

// https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
export * from "./job"
export * from "./item"

export type LoginResult = {
  userId: string;
  username: string;
}

export type WSTopicMap<T> = {
  [key in WSTopicAllValues]?: (data: T) => void
}

export type WSMessage<T> = {
  topic: WSTopicAllValues
  data: T
}