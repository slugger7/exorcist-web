<script>
  import MediaView from "../lib/components/MediaView.svelte";
  import routes from "./routes";
  import { ordinals } from "../lib/controllers/media";
  import { getMediaWithParams } from "../lib/controllers/people";

  let { id, name } = $props();
</script>

<MediaView
  title={name}
  route={routes.personFunc(id, name)}
  {ordinals}
  fetchFn={async (params) => await getMediaWithParams(id, params)}
/>
