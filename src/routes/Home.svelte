<script>
  import { onDestroy, onMount } from "svelte";
  import Pagination from "../lib/components/Pagination.svelte";
  import Search from "../lib/components/Search.svelte";
  import VideoCard from "../lib/components/VideoCard.svelte";
  import { getVideos, ordinals } from "../lib/controllers/videos";
  import {
    getBoolParamOrDefault,
    getIntSearchParamOrDefault,
    getStringSearchParamOrDefault,
    setValueAndNavigate,
  } from "../lib/searchParams";
  import routes from "./routes";

  let page = $state(getIntSearchParamOrDefault("page", 1));
  let limit = $state(getIntSearchParamOrDefault("limit", 48));
  let search = $state(getStringSearchParamOrDefault("search", ""));
  let orderBy = $state(getStringSearchParamOrDefault("orderBy", "added"));
  let ascending = $state(getBoolParamOrDefault("ascending", true));

  /** @type {{ [key: string]: HTMLDivElement}}*/
  const vids = $state({});

  const setSearchAndNavigate = (s) => {
    search = s;

    setValueAndNavigate("search", search, routes.home, { replace: true });
  };

  let searchTimeout;
  const onSearchChange = (event) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setSearchAndNavigate(event.target.value);

      event.target.focus();
    }, 500);
  };

  const onSearchClear = () => {
    setSearchAndNavigate("");
  };

  $effect(() => {
    setValueAndNavigate("orderBy", orderBy, routes.home, { replace: true });
  });

  $effect(() => {
    setValueAndNavigate("ascending", ascending, routes.home, { replace: true });
  });

  const onPopState = () => {
    page = getIntSearchParamOrDefault("page", 1);
    limit = getIntSearchParamOrDefault("limit", 48);
    search = getStringSearchParamOrDefault("search", "");
    orderBy = getStringSearchParamOrDefault("orderBy", "added");
    ascending = getBoolParamOrDefault("ascending", true);
  };

  onDestroy(() => {
    window.removeEventListener("popstate", onPopState);
  });

  onMount(async () => {
    window.addEventListener("popstate", onPopState);
  });

  // scrolling effect
  $effect(() => {
    setTimeout(async () => {
      const item = localStorage.getItem("item");
      const vid = vids[item];
      if (vid) {
        vid.scrollIntoView({ behavior: "auto" });
      }
      localStorage.removeItem("item");
    }, 250);
  });
</script>

<div class="container is-fluid">
  <h1 class="title is-1">Home</h1>
  <div class="block">
    <Search
      onkeyup={onSearchChange}
      value={search}
      onclear={onSearchClear}
      bind:orderBy
      bind:ascending
      {ordinals}
    />
  </div>
  {#await getVideos(page, limit, search, orderBy, ascending)}
    <strong>loading</strong>
  {:then videosPage}
    {console.log("start render")}
    <div class="grid is-col-min-13 is-gap-1">
      {#each videosPage.data as video (video.id)}
        <div class="cell" bind:this={vids[video.id]}>
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
