/** @import { UrlFn } from "../lib/types" */
const routes = {
    people: "/people",
    person: "/people/:id",
    /** @type {UrlFn} */
    personFunc: (id) => `/people/${id}`,
    tags: "/tags",
    /** @type {UrlFn} */
    tagFunc: (id) => `/tags/${id}`,
    libraries: "/libraries",
    /** @type {UrlFn} */
    libraryFunc: (id) => (`/libraries/${id}`),
    library: "/libraries/:id",
    libraryPaths: "/library-paths",
    libraryPath: "/library-paths/:id",
    /** @type {UrlFn} */
    libraryPathFunc: (id) => (`/library-paths/${id}`),
    home: "/",
    video: "/videos/:id",
    /** @type {UrlFn} */
    videoFunc: (id) => (`/videos/${id}`),
    login: "/login",
    logout: "/logout",
    jobs: "/jobs",
    create: {
        library: "/create/library",
        /** @type {UrlFn} */
        libraryPathFunc: (id) => (`/create/library-path/${id}`),
        libraryPath: "/create/library-path/:libraryId",
    }
}
export default routes;