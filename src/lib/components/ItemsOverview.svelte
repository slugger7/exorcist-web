<script>
  import { Link } from "svelte-routing";
  import {
    getStringSearchParamOrDefault,
    setValueAndNavigate,
  } from "../searchParams";
  /**
   * @import { SearchItems, ItemUrlFn } from "../types"
   *
   * @typedef props
   * @type {object}
   * @property {string} title
   * @property {string} route
   * @property {ItemUrlFn} urlFn
   * @property {SearchItems} fetch
   */
  /** @type {props} */
  let { title, route, fetch, urlFn } = $props();

  let value = $state("");
  let search = $state(getStringSearchParamOrDefault("search", ""));

  let searchTimeout;
  const onkeyup = (event) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      search = event.target.value;
      setValueAndNavigate("search", event.target.value, route, {
        replace: true,
      });

      event.target.focus();
    }, 500);
  };

  const onclear = () => {
    value = "";
    search = value;
    setValueAndNavigate("search", value, route, { replace: false });
  };
</script>

<div class="container is-fluid">
  <h1 class="title is-1">{title}</h1>
  <div class="field has-addons">
    <p class="control has-icons-left is-expanded">
      <input
        class="input"
        type="text"
        placeholder="Search"
        bind:value
        {onkeyup}
      />
      <span class="icon is-left">
        <i class="fas fa-search"></i>
      </span>
    </p>
    {#if value !== ""}
      <p class="control">
        <button
          class="button"
          aria-label="clear search"
          onclick={() => {
            value = "";
            onclear();
          }}
        >
          <span class="icon">
            <i class="fas fa-close"></i>
          </span>
        </button>
      </p>
    {/if}
  </div>
  {#await fetch(search)}
    <p>Loading items</p>
  {:then items}
    <div class="field is-grouped is-grouped-multiline">
      {#each items as item (item.id)}
        <div class="control">
          <div class="tags">
            <Link class="tag is-link" to={urlFn(item.id, item.name)}
              >{item.name}</Link
            >
          </div>
        </div>
      {/each}
    </div>
  {/await}
</div>
