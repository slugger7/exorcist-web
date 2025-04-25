<script>
import { onMount } from 'svelte'
import { Router } from 'svelte-routing'
import { userState } from './shared/state/userState.svelte.js'
import Header from './Header.svelte';
import Routes from './routes/Routes.svelte';
import './app.css';

onMount(() => {
    const userId = localStorage.getItem("userId")
    userState.id = userId
})
</script>

<Router url="/">
	  <Header />

    <Routes />
</Router>
