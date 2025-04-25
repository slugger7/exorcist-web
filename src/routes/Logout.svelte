<script>
import { onMount } from 'svelte';
import { navigate } from 'svelte-routing'
import { userState } from '../shared/state/userState.svelte.js'
import { logout } from '../lib/controllers/authentication.js';

onMount(async () => {
    try {
    await logout()
    } catch (e) {
        console.error(e)
    }

    localStorage.clear()
    userState.id = null
    navigate("/")
})
</script>

<h1 class="title is-1">Logout</h1>
