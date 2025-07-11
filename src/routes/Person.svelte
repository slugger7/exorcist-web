<script>
  import MediaView from "../lib/components/MediaView.svelte";
  import routes from "./routes";
  import { ordinals } from "../lib/controllers/media";
  import { getMediaWithParams } from "../lib/controllers/people";

  let { id } = $props();
</script>

<MediaView
  title={id}
  route={routes.personFunc(id)}
  {ordinals}
  fetchFn={async (params) => await getMediaWithParams(id, params)}
/>
