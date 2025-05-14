<script>
    import { onMount } from "svelte";
    import { navigate, Router } from "svelte-routing";
    import { userState } from "./lib/state/userState.svelte.js";
    import Header from "./Header.svelte";
    import Routes from "./routes/Routes.svelte";
    import "./app.css";
    import { setupWebsocket } from "./lib/controllers/websocket.js";

    onMount(() => {
        if (window.location.pathname !== "/") {
            navigate(`${window.location.pathname}${window.location.search}`);
        }
        const userId = localStorage.getItem("userId");
        const username = localStorage.getItem("username");
        userState.id = userId;
        userState.username = username;

        if (userId && import.meta.env.VITE_WS) {
            setupWebsocket();
        }
    });
</script>

<Router url="/">
    <Header />

    <Routes />
</Router>
