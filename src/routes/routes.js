const routes = {
    people: "/people",
    libraries: "/libraries",
    /**
     * @param {string} id
     * @returns {string}
     */
    libraryFunc: (id) => (`/libraries/${id}`),
    library: "/libraries/:id",
    libraryPaths: "/library-paths",
    libraryPath: "/library-paths/:id",
    /**
     * @param {string} id
     * @returns {string}
     */
    libraryPathFunc: (id) => (`/library-paths/${id}`),
    home: "/",
    video: "/videos/:id",
    /** 
         * @param {string} id
         * @returns {string}
        */
    videoFunc: (id) => (`/videos/${id}`),
    login: "/login",
    logout: "/logout",
    jobs: "/jobs",
    create: {
        library: "/create/library",
        /** 
         * @param {string} id
         * @returns {string}
        */
        libraryPathFunc: (id) => (`/create/library-path/${id}`),
        libraryPath: "/create/library-path/:libraryId",
    }
}
export default routes;