<script>
import { Route } from "svelte-routing"
import Home from './routes/Home.svelte'
import People from './routes/People.svelte'
</script>

<div>
    <Route path="/people"><People /></Route>
    <Route path="/"><Home /></Route>
</div>
