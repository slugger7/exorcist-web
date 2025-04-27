<script>
    import { navigate } from "svelte-routing";
    import { userState } from "../shared/state/userState.svelte.js";
    import { login } from "../lib/controllers/authentication.js";
    let username = $state("admin");
    let password = $state("admin");
    const returnUrl = new URLSearchParams(window.location.search).get(
        "returnUrl",
    );

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const userId = await login(username, password);
            userState.id = userId;

            if (returnUrl === null) {
                navigate("/");
            } else {
                navigate(returnUrl);
            }
        } catch (e) {
            console.error(e);
        }
    }
</script>

<div class="container">
    <h1 class="title is-1">Login</h1>
    <form onsubmit={handleSubmit}>
        <div class="field">
            <label class="label" for="username">Username</label>
            <div class="control">
                <input
                    class="input"
                    bind:value={username}
                    name="username"
                    type="text"
                    placeholder="Username"
                />
            </div>
        </div>

        <div class="field">
            <label class="label" for="password">Password</label>
            <div class="control">
                <input
                    class="input"
                    bind:value={password}
                    name="password"
                    type="password"
                    placeholder="Password"
                />
            </div>
        </div>

        <div class="field">
            <div class="control">
                <button class="button is-primary">Login</button>
            </div>
        </div>
    </form>
</div>
