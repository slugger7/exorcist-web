<script>
  import MediaView from "../lib/components/MediaView.svelte";
  import routes from "./routes";
  import { ordinals } from "../lib/controllers/media";
  import {
    getMediaWithParams,
    updateLibrary,
  } from "../lib/controllers/libraries";
  import { navigate } from "svelte-routing";

  let { id, name } = $props();
  let title = $state(name);
  let submittingTitle = $state(false);

  const updateTitle = async (newTitle) => {
    submittingTitle = true;
    try {
      const updatedLibrary = await updateLibrary(id, newTitle);

      title = updatedLibrary.name;

      const params = new URLSearchParams(location.search);

      navigate(`${routes.libraryFunc(id, title)}?${params.toString()}`, {
        replace: true,
      });
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
