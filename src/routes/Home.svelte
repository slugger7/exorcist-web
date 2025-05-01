<script>
  import Pagination from "../lib/components/Pagination.svelte";
  import VideoCard from "../lib/components/VideoCard.svelte"
  import { getVideos } from "../lib/controllers/videos";
</script>

<div class="container is-fluid">
  <h1 class="title is-1">Home</h1>
  {#await getVideos()}
    <strong>loading</strong>
  {:then videosPage}
    <div class="grid">
      {#each videosPage.data as video (video.id)}
        <div class="cell">
          <VideoCard {video} />
        </div>
      {:else}
        <p>no data here</p>
      {/each}
    </div>
   <Pagination />
  {:catch e}
    <pre>Something went wrong</pre>
  {/await}
</div>
