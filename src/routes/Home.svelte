<script>
  import { navigate } from "svelte-routing";
  import Pagination from "../lib/components/Pagination.svelte";
  import Search from "../lib/components/Search.svelte";
  import VideoCard from "../lib/components/VideoCard.svelte";
  import { getVideos } from "../lib/controllers/videos";
  import {
    getIntSearchParamOrDefault,
    getStringSearchParamOrDefault,
  } from "../lib/searchParams";
  import routes from "./routes";

  let page = $state(getIntSearchParamOrDefault("page", 1));
  let limit = $state(getIntSearchParamOrDefault("limit", 48));
  let search = $state(getStringSearchParamOrDefault("search", ""));

  let searchTimeout;
  const onSearchChange = (event) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      search = event.target.value;
      const params = new URLSearchParams(window.location.search);
      params.set("search", search);
      navigate(`${routes.home}?${params.toString()}`);
    }, 500);
  };
</script>

<div class="container is-fluid">
  <h1 class="title is-1">Home</h1>
  <div class="block">
    <Search onkeyup={onSearchChange} value={search} />
  </div>
  {#await getVideos(page, limit, search)}
    <strong>loading</strong>
  {:then videosPage}
    <div class="grid is-col-min-15">
      {#each videosPage.data as video (video.id)}
        <div class="cell">
          <VideoCard {video} />
        </div>
      {:else}
        <p>no data here</p>
      {/each}
    </div>
    <Pagination bind:page bind:limit total={videosPage.total} />
    <div class="section"></div>
  {:catch e}
    <pre>Something went wrong</pre>
  {/await}
</div>
