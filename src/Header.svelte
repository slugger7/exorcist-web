<script>
import { Link } from 'svelte-routing'
import LoginButton from './lib/LoginButton.svelte';
import LogoutButton from './lib/LogoutButton.svelte';
</script>

<header>
    <nav class="navbar" aria-label="main navigation">
        <div class="navbar-brand">
            <Link class="navbar-item" to="/">Exorcist</Link>
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="exorcistNavbar">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="exorcistNavbar" class="navbar-menu">
            <Link class="navbar-item" to="/people">People</Link>
        </div>

        <div class="navbar-end">
            <div class="navbar-item">
                <LoginButton />
            </div>
            <div class="navbar-item">
                <LogoutButton />
            </div>
        </div>
    </nav>
</header>


