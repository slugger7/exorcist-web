<script>
    import { Link } from "svelte-routing";
    import routes from './routes/routes.js'
    import { userState } from "./shared/state/userState.svelte.js";
    import LoginButton from "./lib/components/LoginButton.svelte";
    import LogoutButton from "./lib/components/LogoutButton.svelte";
</script>

<header>
    <nav class="navbar" aria-label="main navigation">
        {#if userState.id}
            <div class="navbar-brand">
                <Link class="navbar-item" to="/">Exorcist</Link>
                <a
                    role="button"
                    class="navbar-burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="exorcistNavbar"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="exorcistNavbar" class="navbar-menu">
                <Link class="navbar-item" to={routes.libraries}>Libraries</Link>
                <Link class="navbar-item" to={routes.people}>People</Link>
            </div>
        {/if}

        <div class="navbar-end">
            {#if !userState.id && !window.location.pathname === routes.login}
                <div class="navbar-item">
                    <LoginButton />
                </div>
            {/if}
            {#if userState.id}
                <div class="navbar-item">
                    <LogoutButton />
                </div>
            {/if}
        </div>
    </nav>
</header>
