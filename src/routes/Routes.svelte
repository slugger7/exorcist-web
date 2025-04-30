<script>
    import { Route } from "svelte-routing";
    import routes from "./routes.js";
    import Home from "./Home.svelte";
    import People from "./People.svelte";
    import Login from "./Login.svelte";
    import Logout from "./Logout.svelte";
    import Libraries from "./Libraries.svelte";
    import Library from "./create/Library.svelte";
    import LibraryPath from "./create/LibraryPath.svelte";
</script>

<main>
    <Route path={routes.login}><Login /></Route>
    <Route path={routes.logout}><Logout /></Route>
    <Route path={routes.people}><People /></Route>
    <Route path={routes.libraries}><Libraries /></Route>
    <Route path={routes.create.library}><Library /></Route>
    <Route path={routes.create.libraryPath} let:params
        ><LibraryPath libraryId={params.libraryId} /></Route
    >
    <Route path={routes.home}><Home /></Route>
</main>
