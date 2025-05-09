<script>
  import Pagination from "../lib/components/Pagination.svelte";
  import VideoCard from "../lib/components/VideoCard.svelte";
  import { getVideos } from "../lib/controllers/videos";
  import { getIntSearchParamOrDefault } from "../lib/searchParams";

  let page = $state(getIntSearchParamOrDefault("page", 1));
  let limit = $state(getIntSearchParamOrDefault("limit", 48));
</script>

<div class="container is-fluid">
  <h1 class="title is-1">Home</h1>
  {#await getVideos(page, limit)}
    <strong>loading</strong>
  {:then videosPage}
    <div class="grid is-col-min-15">
      {#each videosPage.data as video (video.id)}
        <div class="cell">
          <VideoCard {video} />
        </div>
      {:else}
        <p>no data here</p>
      {/each}
    </div>
    <Pagination bind:page bind:limit total={videosPage.total} />
    <div class="section"></div>
  {:catch e}
    <pre>Something went wrong</pre>
  {/await}
</div>
