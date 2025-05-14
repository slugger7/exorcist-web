<script>
    import { Link } from "svelte-routing";
    import routes from "../../routes/routes";
    import { imageUrlById } from "../controllers/image";

    /** @import { Video } from "../types"*/

    /** @type {{video: Video}} */
    let { video } = $props();
</script>

<figure class="image">
    <Link to={routes.videoFunc(video.id)}
        ><img src={imageUrlById(video.thumbnailId)} alt={video.title} /></Link
    >
</figure>
