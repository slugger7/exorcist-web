/** @import { ItemUrlFn } from "../lib/types" */
const routes = {
    people: "/people",
    person: "/people/:id/:name",
    /** @type {ItemUrlFn} */
    personFunc: (id, name) => `/people/${id}/${name}`,
    tags: "/tags",
    tag: "/tags/:id/:name",
    /** @type {ItemUrlFn} */
    tagFunc: (id, name) => `/tags/${id}/${name}`,
    libraries: "/libraries",
    /** @type {ItemUrlFn} */
    libraryFunc: (id, name) => (`/libraries/${id}/${name}`),
    library: "/libraries/:id/:name",
    libraryPaths: "/library-paths",
    libraryPath: "/library-paths/:id",
    /** @type {ItemUrlFn} */
    libraryPathFunc: (id, name) => (`/library-paths/${id}`),
    home: "/",
    video: "/videos/:id",
    /** @type {ItemUrlFn} */
    videoFunc: (id) => (`/videos/${id}`),
    login: "/login",
    logout: "/logout",
    jobs: "/jobs",
    /** @type {ItemUrlFn} */
    userFunc: (id, name) => (`/users/${id}/${name}`),
    user: "/users/:id/:name",
    create: {
        library: "/create/libraries",
        /** @type {ItemUrlFn} */
        libraryPathFunc: (id) => (`/create/library-paths/${id}`),
        libraryPath: "/create/library-paths/:libraryId",
    },
    edit: {
        library: "/edit/libraries/:libraryId/:name",
        /** @type {ItemUrlFn} */
        libraryFunc: (id, name) => (`/edit/libraries/${id}/${name}`)
    }
}
export default routes;