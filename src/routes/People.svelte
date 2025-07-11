<script>
  import { Link } from "svelte-routing";
  import { getAll } from "../lib/controllers/people";
  import {
    getStringSearchParamOrDefault,
    setValueAndNavigate,
  } from "../lib/searchParams";
  import routes from "./routes";

  let value = $state("");
  let search = $state(getStringSearchParamOrDefault("search", ""));

  let searchTimeout;
  const onkeyup = (event) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      search = event.target.value;
      setValueAndNavigate("search", event.target.value, routes.people, {
        replace: true,
      });

      event.target.focus();
    }, 500);
  };

  const onclear = () => {
    value = "";
    search = value;
    setValueAndNavigate("search", value, routes.people, { replace: false });
  };
</script>

<div class="container is-fluid">
  <h1 class="title is-1">People</h1>
  <div class="field has-addons">
    <p class="control has-icons-left is-expanded">
      <input
        class="input"
        type="text"
        placeholder="Search people"
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
  {#await getAll(search)}
    <p>Loading people</p>
  {:then people}
    <div class="field is-grouped is-grouped-multiline">
      {#each people as person (person.id)}
        <div class="control">
          <div class="tags">
            <Link
              class="tag is-link"
              to={routes.personFunc(person.id, person.name)}>{person.name}</Link
            >
          </div>
        </div>
      {/each}
    </div>
  {/await}
</div>
