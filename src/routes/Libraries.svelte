<script>
  import { getLibraries } from "../lib/controllers/libraries";
  import HeaderIconButton from "../lib/components/HeaderIconButton.svelte";
</script>

<div class="container">
  <h1 class="title is-1 inline">Libraries</h1>
  <HeaderIconButton />

  {#await getLibraries()}
    <span>loading</span>
  {:then libraries}
    <pre>{JSON.stringify(libraries, null, 2)}</pre>
  {:catch}
    <span>something went wrong</span>
  {/await}
</div>

<style>
  .inline {
    display: inline;
  }
</style>
