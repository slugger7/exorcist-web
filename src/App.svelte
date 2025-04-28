<script>
    import { onMount } from "svelte";
    import { navigate, Router } from "svelte-routing";
    import { userState } from "./shared/state/userState.svelte.js";
    import Header from "./Header.svelte";
    import Routes from "./routes/Routes.svelte";
    import "./app.css";

    onMount(() => {
        if (window.location.pathname !== "/") {
            navigate(`${window.location.pathname}${window.location.search}`);
        }
        const userId = localStorage.getItem("userId");
        const username = localStorage.getItem("username");
        userState.id = userId;
        userState.username = username;
    });
</script>

<Router url="/">
    <Header />

    <Routes />
</Router>
