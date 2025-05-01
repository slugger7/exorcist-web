<script>
    import { Link } from "svelte-routing";
    import routes from "../../routes/routes";
    import { imageUrlById } from "../controllers/image";

    /** @import { Video } from "../types"*/

    /** @type {{video: Video}} */
    let { video } = $props();
</script>

<div class="card">
    <div class="card-image">
        <figure class="image is16by9">
            <Link to={routes.videoFunc(video.id)}
                ><img
                    src={imageUrlById(video.thumbnailId)}
                    alt={video.title}
                /></Link
            >
        </figure>
    </div>
    <header class="card-header">
        <Link class="card-header-title" to={routes.videoFunc(video.id)}
            >{video.title}</Link
        >
    </header>
</div>
