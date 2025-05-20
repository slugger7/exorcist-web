<script>
  /** @import { WSMessage, WSTopicMap, Page, Video } from "../lib/types"*/
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
  import { PONG } from "../lib/constants/websocket";
  import { wsState } from "../lib/state/wsState.svelte";

  let page = $state(getIntSearchParamOrDefault("page", 1));
  let limit = $state(getIntSearchParamOrDefault("limit", 50));
  let search = $state(getStringSearchParamOrDefault("search", ""));
  let orderBy = $state(getStringSearchParamOrDefault("orderBy", "added"));
  let ascending = $state(getBoolParamOrDefault("ascending", true));
  let loading = $state(false);
  let error = $state();
  /** @type {Page<Video>}*/
  let videosPage = $state();
  /** @type {Video[]} */
  let newVideos = $state([]);

  const fetchPage = async () => {
    loading = true;
    try {
      videosPage = await getVideos(page, limit, search, orderBy, ascending);
    } catch (e) {
      error = e;
    } finally {
      loading = false;
    }
  };

  onDestroy(() => {
    window.removeEventListener("popstate", onPopState);

    if (wsState.active) {
      wsState.connection.removeEventListener("message", onWsMessage);
    }
  });

  onMount(async () => {
    window.addEventListener("popstate", onPopState);

    await fetchPage();
  });

  const setSearchAndNavigate = (s) => {
    search = s;

    setValueAndNavigate("search", search, routes.home, { replace: true });
    fetchPage();
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
    fetchPage();
  });

  $effect(() => {
    setValueAndNavigate("ascending", ascending, routes.home, { replace: true });
    fetchPage();
  });

  $effect(() => {
    setValueAndNavigate("limit", limit.toString(), routes.home, {
      replace: true,
    });
    fetchPage();
  });

  $effect(() => {
    setValueAndNavigate("page", page.toString(), routes.home);
    fetchPage();
  });

  const onPopState = () => {
    page = getIntSearchParamOrDefault("page", 1);
    limit = getIntSearchParamOrDefault("limit", 48);
    search = getStringSearchParamOrDefault("search", "");
    orderBy = getStringSearchParamOrDefault("orderBy", "added");
    ascending = getBoolParamOrDefault("ascending", true);
  };

  $effect(() => {
    if (wsState.active) {
      wsState.connection.addEventListener("message", onWsMessage);
    }
  });

  /** @param {MessageEvent<string>} e */
  const onWsMessage = (e) => {
    if (e.data === PONG) return;

    /** @type {WSMessage<Video>}*/
    const data = JSON.parse(e.data);

    const topic = topics[data.topic];
    if (topic) {
      topic(data.data);
    }
  };

  /** @type {WSTopicMap<Video>}*/
  const topics = {
    video_create: (video) => {
      newVideos.push(video);
    },
    video_update: (video) => {
      newVideos = newVideos.map((v) => {
        if (v.id === video.id) {
          return { ...v, ...video };
        }
        return v;
      });

      if (videosPage) {
        videosPage.data = videosPage.data.map((v) => {
          if (v.id === video.id) {
            return {
              ...v,
              ...video,
            };
          }
          return v;
        });
      }
    },
  };
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
  {#if loading}
    <strong>loading</strong>
  {:else if !error && videosPage}
    <div class="grid is-col-min-13 is-gap-1">
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
  {:else if error}
    <pre>Something went wrong {error}</pre>
  {/if}
</div>
