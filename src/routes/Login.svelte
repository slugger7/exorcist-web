<script>
import { navigate } from 'svelte-routing'
import { userState } from '../shared/state/userState.svelte.js'
import { login } from '../lib/controllers/authentication.js'
let username = $state('admin');
let password = $state('admin');

async function handleSubmit(e) {
    e.preventDefault();

    try {
        const userId = await login(username, password)
        userState.id = userId

        navigate("/")
    } catch (e) {
        console.error(e)
    }
}
</script>

<div class="container">
    <h1 class="title is-1">Login</h1>
    <form onsubmit={handleSubmit}>
        <div class="field">
            <label class="label">Username</label>
            <div class="control">
                <input class="input" bind:value={username} type="text" placeholder="Username">
            </div>
        </div>

        <div class="field">
            <label class="label">Password</label>
            <div class="control">
                <input class="input" bind:value={password} type="password" placeholder="Password">
            </div>
        </div>

        <div class="field">
            <div class="control">
                <button class="button is-primary">Login</button>
            </div>
        </div>
    </form>
</div>
