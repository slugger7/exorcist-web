<script>
  import LibraryPathCard from "../lib/components/LibraryPathCard.svelte";
  import { getPaths } from "../lib/controllers/libraries";
  /** @type {{id:string}}*/
  let { id: libraryId } = $props();
</script>

<div class="container">
  <h1 class="title is-1">Library</h1>

  <div class="section">
    {#await getPaths(libraryId)}
      <span>loading</span>
    {:then libraryPaths}
      <div class="grid">
        {#each libraryPaths as { path, id } (id)}
          <div class="cell">
            <LibraryPathCard {path} {id} />
          </div>
        {:else}
          <p>No library paths in library</p>
        {/each}
      </div>
    {:catch}
      <span>something went wrong</span>
    {/await}
  </div>
</div>
