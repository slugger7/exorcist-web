<script>
  import { getVideos } from "../lib/controllers/videos";
</script>

<div class="container">
  <h1 class="title is-1">Home</h1>
  {#await getVideos()}
    <strong>loading</strong>
  {:then videos}
    <pre>
      {JSON.stringify(videos, null, 2)}
    </pre>
  {:catch e}
    <pre>Something went wrong</pre>
  {/await}
</div>
