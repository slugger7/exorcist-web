<script>
  import HeaderIconButton from "../lib/components/HeaderIconButton.svelte";
  import { create } from "../lib/controllers/job";
  import { get } from "../lib/controllers/libraryPaths";

  /** @type {{id: string}}*/
  let { id } = $props();
  let creatingScanJob = $state(false);

  const handleScanPathClick = async () => {
    creatingScanJob = true;

    try {
      await create("scan_path", { libraryPathId: id });
    } catch (e) {
      console.error(e);
    } finally {
      creatingScanJob = false;
    }
  };
</script>

<div class="container">
  <h1 class="title is-1 inline">Library path</h1>
  <HeaderIconButton
    icon="fa-solid fa-arrows-rotate"
    ariaLabel="scan library path"
    onclick={handleScanPathClick}
  />

  {#await get(id)}
    <p>loading</p>
  {:then libraryPath}
    <pre>{JSON.stringify(libraryPath, null, 2)}</pre>
  {:catch}
    <p>something went wrong</p>
  {/await}
</div>
