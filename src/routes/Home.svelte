<script>
  import { getAllWithParams, ordinals } from "../lib/controllers/media";
  import routes from "./routes";
  import MediaView from "../lib/components/MediaView.svelte";
</script>

<MediaView
  title="Home"
  fetchFn={getAllWithParams}
  route={routes.home}
  {ordinals}
/>
