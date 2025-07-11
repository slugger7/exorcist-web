<script>
  import { getAll } from "../lib/controllers/tags";
  import routes from "./routes";
  import ItemsOverview from "../lib/components/ItemsOverview.svelte";
</script>

<ItemsOverview
  title="Tags"
  route={routes.tags}
  urlFn={routes.tagFunc}
  fetch={getAll}
/>
