export type Library = {
  id: string;
  name: string;
  created: Date;
  modified: Date;
}

export type LibraryPath = {
  id: string;
  libraryId: string;
  path: string;
  created: Date;
  modified: Date;
}