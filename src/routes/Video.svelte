<script>
    import { imageUrlById } from "../lib/controllers/image";
    import { videoUrlById } from "../lib/controllers/videos";

    /** @import { Video } from "../lib/types"*/
    /** @type {{id: string}}*/
    let { id } = $props();

    /** @type {?Video}*/
    let { thumbnailId, title } = history.state;
</script>

<div class="container">
    <h1 class="title is-1">{title}</h1>
</div>
<div class="container is-fluid">
    <!-- svelte-ignore a11y_media_has_caption -->
    <video src={videoUrlById(id)} controls poster={imageUrlById(thumbnailId)}
    ></video>
</div>

<style>
    video {
        height: 100%;
        width: 100%;
        max-height: 90vh;
    }
</style>
