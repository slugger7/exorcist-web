<script>
  import { getLibraries } from "../lib/controllers/libraries";
  import HeaderIconLink from "../lib/components/HeaderIconLink.svelte";
  import routes from "./routes.js";
  import LibraryCard from "../lib/components/LibraryCard.svelte";
</script>

<div class="container">
  <h1 class="title is-1 inline">Libraries</h1>
  <HeaderIconLink
    icon="fa-solid fa-plus"
    ariaLabel="create library"
    to={routes.create.library}
  />

  <div class="section">
    {#await getLibraries()}
      <span>loading</span>
    {:then libraries}
      {#each libraries as { id, name } (id)}
        <LibraryCard {name} {id} />
      {:else}
        <p>No libraries. Create one</p>
      {/each}
    {:catch}
      <p>Oops! Could not get libraries</p>
    {/await}
  </div>
</div>

<style>
  .inline {
    display: inline;
  }
</style>
