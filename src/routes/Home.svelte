<script>
  /**
   * @import { WSMessage, WSTopicMap } from "../lib/types"
   * @import { PageDTO, MediaOverviewDTO } from "../dto"
   */
  import { onDestroy, onMount } from "svelte";
  import Pagination from "../lib/components/Pagination.svelte";
  import Search from "../lib/components/Search.svelte";
  import VideoCard from "../lib/components/VideoCard.svelte";
  import { getAll, ordinals } from "../lib/controllers/media";
  import {
    getBoolParamOrDefault,
    getIntSearchParamOrDefault,
    getStringSearchParamOrDefault,
    setValueAndNavigate,
  } from "../lib/searchParams";
  import routes from "./routes";
  import { PONG } from "../lib/constants/websocket";
  import { wsState } from "../lib/state/wsState.svelte";
  import { Link } from "svelte-routing";

  let page = $state(getIntSearchParamOrDefault("page", 1));
  let limit = $state(getIntSearchParamOrDefault("limit", 50));
  let search = $state(getStringSearchParamOrDefault("search", ""));
  let orderBy = $state(getStringSearchParamOrDefault("orderBy", "added"));
  let ascending = $state(getBoolParamOrDefault("ascending", true));
  let loading = $state(false);
  let error = $state();
  /** @type {PageDTO<MediaOverviewDTO>}*/
  let videosPage = $state();
  /** @type {MediaOverviewDTO[]} */
  let newVideos = $state([]);

  const fetchPage = async () => {
    loading = true;
    try {
      videosPage = await getAll(page, limit, search, orderBy, ascending);
    } catch (e) {
      error = e;
    } finally {
      loading = false;
    }
  };

  $effect(() => {
    fetchPage();
  });

  onDestroy(() => {
    window.removeEventListener("popstate", onPopState);

    if (wsState.active) {
      wsState.connection.removeEventListener("message", onWsMessage);
    }
  });

  onMount(async () => {
    window.addEventListener("popstate", onPopState);
  });

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

  $effect(() => {
    setValueAndNavigate("limit", limit.toString(), routes.home, {
      replace: true,
    });
  });

  $effect(() => {
    setValueAndNavigate("page", page.toString(), routes.home);
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

    /** @type {WSMessage<MediaOverviewDTO>}*/
    const data = JSON.parse(e.data);

    const topic = topics[data.topic];
    if (topic) {
      topic(data.data);
    }
  };

  /** @type {WSTopicMap<MediaOverviewDTO>}*/
  const topics = {
    video_create: (video) => {
      newVideos.push(video);
      videosPage.total++;
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
  {#if videosPage && videosPage.data.length !== 0}
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
  {/if}

  {#if loading}
    <div class="grid is-col-min-13 is-gap-1">
      {#each Array.apply(null, Array(limit)) as sk}
        <div class="cell">
          <figure class="image is-16x9 is-skeleton"></figure>
        </div>
      {/each}
    </div>
  {:else if !error && videosPage}
    <div class="grid is-col-min-13 is-gap-1">
      {#each videosPage.data as video (video.id)}
        <div class="cell">
          <VideoCard {video} />
        </div>
      {:else}
        <div class="cell content">
          <p>Nothing to see here</p>
          <br />
          <p>Start by doing the following steps</p>
          <ol>
            <li>
              Create a library <Link to={routes.create.library}
                >Create Library</Link
              >
            </li>
            <li>Create a library path on the library</li>
            <li>Scan the library path</li>
          </ol>
        </div>
        <!-- display guide on how to get data into the library here -->
      {/each}
    </div>
    {#if videosPage.total > 0}
      <Pagination bind:page bind:limit total={videosPage.total} />
      <div class="section"></div>
    {/if}
  {:else if error}
    <pre>Something went wrong {error}</pre>
  {/if}
</div>
