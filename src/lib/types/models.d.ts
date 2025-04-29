// https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
export type Library = {
  id: String;
  name: String;
  created: Date;
  modified: Date;
}

export type Video = {
  id: String;
  title: String;
  path: String;
  thumbnailPath: String
}

export type LoginResult = {
  userId: String;
  username: String;
}