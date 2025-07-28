<script>
  import { Link } from "svelte-routing";
  /**
   * @import { FetchMedia, Ordinal, WSTopicMapView, WSMessage } from "../types"
   * @import { PageDTO, MediaOverviewDTO } from "../../dto"
   */
  import {
    getArrayOfStringsSearchParamOrDefault,
    getBoolParamOrDefault,
    getIntSearchParamOrDefault,
    getStringSearchParamOrDefault,
    setValueAndNavigate,
    setValuesAndNavigate,
  } from "../searchParams";
  import Search from "./Search.svelte";
  import routes from "../../routes/routes";
  import VideoCard from "./VideoCard.svelte";
  import Pagination from "./Pagination.svelte";
  import { onDestroy, onMount } from "svelte";
  import { PONG } from "../constants/websocket";
  import { wsState } from "../state/wsState.svelte";

  /**
   * @typedef props
   * @type {object}
   * @property {string} title
   * @property {FetchMedia} fetchFn
   * @property {string} route
   * @property {Ordinal[]} ordinals
   * @property {WSTopicMapView<MediaOverviewDTO>} [topicMap]
   * @property {boolean} [disablePeople]
   * @property {boolean} [disableTags]
   */
  /** @type {props}*/
  let {
    title,
    route,
    ordinals,
    topicMap = {},
    fetchFn,
    disablePeople = false,
    disableTags = false,
  } = $props();

  let page = $state(getIntSearchParamOrDefault("page", 1));
  let limit = $state(getIntSearchParamOrDefault("limit", 50));
  let search = $state(getStringSearchParamOrDefault("search", ""));
  let orderBy = $state(getStringSearchParamOrDefault("orderBy", "added"));
  let ascending = $state(getBoolParamOrDefault("ascending", false));
  let selectedTags = $state(getArrayOfStringsSearchParamOrDefault("tags", []));
  let selectedPeople = $state(
    getArrayOfStringsSearchParamOrDefault("people", []),
  );
  let loading = $state(false);
  let error = $state();
  /** @type {PageDTO<MediaOverviewDTO>}*/
  let mediaPage = $state();
  /** @type {MediaOverviewDTO[]}*/
  let newMedia = $state([]);

  onMount(async () => {
    window.addEventListener("popstate", onPopState);
  });

  onDestroy(() => {
    window.removeEventListener("popstate", onPopState);

    if (wsState.active) {
      wsState.connection.removeEventListener("message", onWsMessage);
    }
  });

  const onPopState = () => {
    page = getIntSearchParamOrDefault("page", 1);
    limit = getIntSearchParamOrDefault("limit", 48);
    search = getStringSearchParamOrDefault("search", "");
    orderBy = getStringSearchParamOrDefault("orderBy", "added");
    ascending = getBoolParamOrDefault("ascending", true);
    selectedPeople = getArrayOfStringsSearchParamOrDefault("people", []);
    selectedTags = getArrayOfStringsSearchParamOrDefault("tags", []);
  };

  const fetchPage = async () => {
    const params = new URLSearchParams();
    params.set("skip", ((page - 1) * limit).toString());
    params.set("limit", limit.toString());
    params.set("asc", ascending.toString());
    params.set("orderBy", orderBy);

    if (selectedTags.length > 0) {
      selectedTags.forEach((tag) => {
        params.append("tags", tag);
      });
    }

    if (selectedPeople.length > 0) {
      selectedPeople.forEach((person) => {
        params.append("people", person);
      });
    }

    if (search !== "") {
      params.set("search", search);
    }

    loading = true;
    try {
      mediaPage = await fetchFn(params);
    } catch (e) {
      error = e;
    } finally {
      loading = false;
    }
  };

  $effect(() => {
    fetchPage();
  });

  $effect(() => {
    if (disableTags) return;
    setValuesAndNavigate("tags", selectedTags, route, { replace: true });
  });

  $effect(() => {
    if (disablePeople) return;
    setValuesAndNavigate("people", selectedPeople, route, { replace: true });
  });

  $effect(() => {
    setValueAndNavigate("orderBy", orderBy, route, { replace: true });
  });

  $effect(() => {
    setValueAndNavigate("ascending", ascending, route, { replace: true });
  });

  $effect(() => {
    setValueAndNavigate("limit", limit.toString(), route, { replace: true });
  });

  $effect(() => {
    const params = new URLSearchParams(location.search);

    setValueAndNavigate("page", page.toString(), route, {
      replace: params.get("page") !== "",
    });
  });

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

    const topic = topicMap[data.topic];
    if (topic) {
      const [updatedMediaPage, updatedNewMedia] = topic(
        mediaPage,
        newMedia,
        data.data,
      );
      mediaPage = updatedMediaPage;
      newMedia = updatedNewMedia;
      3;
    }
  };

  /** @param {string} s */
  const setSearchAndNavigate = (s) => {
    search = s;

    setValueAndNavigate("search", search, route, { replace: true });
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
</script>

<div class="container is-fluid">
  <h1 class="title is-1">{title}</h1>
  <div class="block">
    <Search
      onkeyup={onSearchChange}
      value={search}
      onclear={onSearchClear}
      bind:orderBy
      bind:ascending
      bind:selectedTags
      bind:selectedPeople
      {ordinals}
      {disablePeople}
      {disableTags}
    />
  </div>

  {#if loading}
    <div class="grid is-col-min-13 is-gap-1">
      {#each Array.apply(null, Array(limit)) as sk}
        <div class="cell">
          <figure class="image is-16x9 is-skeleton"></figure>
        </div>
      {/each}
    </div>
  {:else if !error && mediaPage}
    <div class="grid is-col-min-13 is-gap-1">
      {#each mediaPage.data as video (video.id)}
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
    {#if mediaPage.total > 0}
      <Pagination bind:page bind:limit total={mediaPage.total} url={route} />
      <div class="section"></div>
    {/if}
  {:else if error}
    <pre>Something went wrong {error}</pre>
  {/if}
</div>
