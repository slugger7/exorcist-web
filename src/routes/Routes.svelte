<script>
import { Route } from "svelte-routing"
import Home from './Home.svelte'
import People from './People.svelte'
import Login from './Login.svelte'
import Logout from './Logout.svelte'
</script>

<main>
    <Route path="/login"><Login /></Route>
    <Route path="/logout"><Logout /></Route>
    <Route path="/people"><People /></Route>
    <Route path="/"><Home /></Route>
</main>
