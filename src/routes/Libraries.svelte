<script>
  import { getLibraries } from "../lib/controllers/libraries";
  import HeaderIconLink from "../lib/components/HeaderIconLink.svelte";
  import routes from "./routes.js";
</script>

<div class="container">
  <h1 class="title is-1 inline">Libraries</h1>
  <HeaderIconLink
    icon="fa-solid fa-plus"
    ariaLabel="create library"
    to={routes.create.library}
  />

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
