<script>
  import MediaView from "../lib/components/MediaView.svelte";
  import routes from "./routes";
  import { ordinals } from "../lib/controllers/media";
  import {
    getMediaWithParams,
    updateLibrary,
  } from "../lib/controllers/libraries";

  let { id, name } = $props();
  let title = $state("");
  let submittingTitle = $state(false);

  const updateTitle = async (newTitle) => {
    submittingTitle = true;
    try {
      const updatedLibrary = await updateLibrary(id, newTitle);

      title = updatedLibrary.name;
    } finally {
      submittingTitle = false;
    }

    return title;
  };
</script>

<MediaView
  title={title.length > 0 ? title : name}
  route={routes.libraryFunc(id, name)}
  {ordinals}
  fetchFn={async (params) => await getMediaWithParams(id, params)}
  {updateTitle}
  bind:submittingTitle
/>
