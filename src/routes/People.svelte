<script>
import { onMount } from 'svelte'
import { getLibraries } from '../lib/controllers/libraries.js'

onMount(async () => {
    await getLibraries()
})
</script>

<h1 class="title is-1">People</h1>
