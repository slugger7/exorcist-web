<script>
  import { Link } from "svelte-routing";
  /**
   * @import { FetchMedia, Ordinal } from "../types"
   * @import { PageDTO, MediaOverviewDTO } from "../../dto"
   */
  import {
    getBoolParamOrDefault,
    getIntSearchParamOrDefault,
    getStringSearchParamOrDefault,
    setValueAndNavigate,
  } from "../searchParams";
  import Search from "./Search.svelte";
  import routes from "../../routes/routes";
  import VideoCard from "./VideoCard.svelte";
  import Pagination from "./Pagination.svelte";

  /**
   * @typedef props
   * @type {object}
   * @property {string} title
   * @property {FetchMedia} fetchFn
   * @property {string} route
   * @property {Ordinal[]} ordinals
   */
  /** @type {props}*/
  let { title, route, ordinals, fetchFn } = $props();

  let page = $state(getIntSearchParamOrDefault("page", 1));
  let limit = $state(getIntSearchParamOrDefault("limit", 50));
  let search = $state(getStringSearchParamOrDefault("search", ""));
  let orderBy = $state(getStringSearchParamOrDefault("orderBy", "added"));
  let ascending = $state(getBoolParamOrDefault("ascending", false));
  let loading = $state(false);
  let error = $state();
  /** @type {PageDTO<MediaOverviewDTO>}*/
  let mediaPage = $state();

  const fetchPage = async () => {
    const params = new URLSearchParams();
    params.set("skip", ((page - 1) * limit).toString());
    params.set("limit", limit.toString());
    params.set("asc", ascending.toString());
    params.set("orderBy", orderBy);

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
  {#if mediaPage && mediaPage.data.length !== 0}
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
      <Pagination bind:page bind:limit total={mediaPage.total} />
      <div class="section"></div>
    {/if}
  {:else if error}
    <pre>Something went wrong {error}</pre>
  {/if}
</div>
