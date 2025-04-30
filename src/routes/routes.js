const routes = {
    people: "/people",
    libraries: "/libraries",
    home: "/",
    login: "/login",
    logout: "/logout",
    create: {
        library: "/create/library",
        libraryPath: "/create/library-path/:libraryId",
        /** 
         * @param {string} id
         * @returns {string}
        */
        libraryPathFunc: (id) => (`/create/library-path/${id}`)
    }
}
export default routes;