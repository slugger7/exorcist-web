<script>
  import { Link } from "svelte-routing";
  import routes from "../../routes/routes";
  import { imageUrlById } from "../controllers/image";

  /** @import { MediaOverviewDTO } from "../../dto"*/

  /** @type {{video: MediaOverviewDTO}} */
  let { video } = $props();
  /** @type {HTMLElement}*/
  let element = $state();

  $effect(() => {
    requestAnimationFrame(() => {
      const item = localStorage.getItem("item");
      if (item === video.id) {
        element.scrollIntoView({ behavior: "smooth" });
        localStorage.removeItem("item");
      }
    });
  });
</script>

<figure
  class={`image ${video.thumbnailId === "00000000-0000-0000-000000000000" ? "is-skeleton" : ""}`}
  bind:this={element}
>
  <Link to={routes.videoFunc(video.id)}
    ><img src={imageUrlById(video.thumbnailId)} alt={video.title} /></Link
  >
</figure>
