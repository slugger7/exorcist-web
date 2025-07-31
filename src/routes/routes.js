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
    playlists: "/playlists",
    playlist: "/playlists/:id/:name",
    /** @type {ItemUrlFn} */
    playlistFn: (id, name) => (`/playlists/${id}/${name}`),
    playlistAdd: "/playlists-add",
    create: {
        library: "/create/libraries",
        /** @type {ItemUrlFn} */
        libraryPathFunc: (id) => (`/create/library-paths/${id}`),
        libraryPath: "/create/library-paths/:libraryId",
        playlist: "/create/plailsts"
    },
    edit: {
        library: "/edit/libraries/:libraryId/:name",
        /** @type {ItemUrlFn} */
        libraryFunc: (id, name) => (`/edit/libraries/${id}/${name}`),
        playlist: "/edit/playlist/:playlistId/:name",
        /** @type {ItemUrlFn} */
        playlistFn: (id, name) => (`/edit/playlist/${id}/${name}`)
    },
    delete: {
        media: "/delete/media/:mediaId/:name",
        /** @type {ItemUrlFn} */
        mediaFunc: (id, name) => (`/delete/media/${id}/${name}`)
    }
}
export default routes;