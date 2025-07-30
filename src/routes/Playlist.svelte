<script>
  import MediaView from "../lib/components/MediaView.svelte";
  import routes from "./routes";
  import { ordinals } from "../lib/controllers/media";
  import { getMediaWithParams } from "../lib/controllers/playlists";

  let { id, name } = $props();
</script>

<MediaView
  title={name}
  route={routes.playlistFn(id, name)}
  {ordinals}
  fetchFn={async (params) => await getMediaWithParams(id, params)}
/>
