<script>
    import { Route } from "svelte-routing";
    import routes from "./routes.js";
    import Home from "./Home.svelte";
    import People from "./People.svelte";
    import Login from "./Login.svelte";
    import Logout from "./Logout.svelte";
    import Libraries from "./Libraries.svelte";
    import CreateLibrary from "./create/Library.svelte";
    import CreateLibraryPath from "./create/LibraryPath.svelte";
    import Library from "./Library.svelte";
    import LibraryPath from "./LibraryPath.svelte";
    import Video from "./Video.svelte";
    import Jobs from "./Jobs.svelte";
    import Person from "./Person.svelte";
    import Tag from "./Tag.svelte";
    import Tags from "./Tags.svelte";
</script>

<main>
    <Route path={routes.login}><Login /></Route>
    <Route path={routes.logout}><Logout /></Route>
    <Route path={routes.people}><People /></Route>
    <Route path={routes.person} let:params
        ><Person id={params.id} name={params.name} /></Route
    >
    <Route path={routes.tags}><Tags /></Route>
    <Route path={routes.tag} let:params
        ><Tag id={params.id} name={params.name} /></Route
    >
    <Route path={routes.libraries}><Libraries /></Route>
    <Route path={routes.create.library}><CreateLibrary /></Route>
    <Route path={routes.library} let:params><Library id={params.id} /></Route>
    <Route path={routes.create.libraryPath} let:params
        ><CreateLibraryPath libraryId={params.libraryId} /></Route
    >
    <Route path={routes.libraryPath} let:params
        ><LibraryPath id={params.id} /></Route
    >
    <Route path{routes.jobs}><Jobs /></Route>
    <Route path={routes.home}><Home /></Route>
    <Route path={routes.video} let:params><Video id={params.id} /></Route>
</main>
