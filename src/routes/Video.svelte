<script>
  import { onDestroy } from "svelte";
  import { imageUrlById } from "../lib/controllers/image";
  import { videoUrlById, get } from "../lib/controllers/media";

  /** @type {{id: string}}*/
  let { id } = $props();

  onDestroy(() => {
    localStorage.setItem("item", id);
  });
</script>

{#await get(id)}
  <p>loading</p>
{:then { thumbnailId, title }}
  <div class="container is-fluid">
    <!-- svelte-ignore a11y_media_has_caption -->
    <video src={videoUrlById(id)} controls poster={imageUrlById(thumbnailId)}
    ></video>

    <div class="container">
      <h1 class="title is-1">{title}</h1>
    </div>
  </div>
{:catch}
  <p>something went wrong</p>
{/await}

<style>
  video {
    height: 100%;
    width: 100%;
    max-height: 90vh;
  }
</style>
