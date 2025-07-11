/** @import { ItemUrlFn } from "../lib/types" */
const routes = {
    people: "/people",
    person: "/people/:id/:name",
    /** @type {ItemUrlFn} */
    personFunc: (id, name) => `/people/${id}/${name}`,
    tags: "/tags",
    /** @type {ItemUrlFn} */
    tagFunc: (id) => `/tags/${id}`,
    libraries: "/libraries",
    /** @type {ItemUrlFn} */
    libraryFunc: (id) => (`/libraries/${id}`),
    library: "/libraries/:id",
    libraryPaths: "/library-paths",
    libraryPath: "/library-paths/:id",
    /** @type {ItemUrlFn} */
    libraryPathFunc: (id) => (`/library-paths/${id}`),
    home: "/",
    video: "/videos/:id",
    /** @type {ItemUrlFn} */
    videoFunc: (id) => (`/videos/${id}`),
    login: "/login",
    logout: "/logout",
    jobs: "/jobs",
    create: {
        library: "/create/library",
        /** @type {ItemUrlFn} */
        libraryPathFunc: (id) => (`/create/library-path/${id}`),
        libraryPath: "/create/library-path/:libraryId",
    }
}
export default routes;