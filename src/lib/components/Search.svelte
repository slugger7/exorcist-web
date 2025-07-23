<script>
  import { getAll } from "../controllers/tags";
  import Items from "./Items.svelte";
  import ItemSelector from "./ItemSelector.svelte";
  import Select from "./Select.svelte";

  /**
   * @import { ChangeEventHandler } from "svelte/elements";
   * @import { Ordinal, Item } from "../types"
   *
   * @typedef props
   * @type {object}
   * @property {string} [value]
   * @property {ChangeEventHandler<HTMLInputElement>} onkeyup
   * @property {Function} [onclear]
   * @property {Ordinal[]} ordinals
   * @property {string} orderBy
   * @property {boolean} [ascending]
   */

  /** @type {props} */
  let {
    value = $bindable(""),
    onkeyup,
    onclear = () => {},
    ordinals,
    orderBy = $bindable(),
    ascending = $bindable(),
  } = $props();

  let extraOptions = $state(false);
  /** @type {Item[]}*/
  let tags = $state([]);
  let loadingTags = $state(false);
  /** @type {Item[]}*/
  let selectedTags = $state([]);
  let people = $state([]);
  let loadingPeople = $state(false);

  const fetchTags = async () => {
    loadingTags = true;
    try {
      tags = await getAll();
    } finally {
      loadingTags = false;
    }
  };

  $effect(() => {
    if (extraOptions && tags.length == 0) {
      fetchTags();
    }
  });

  /**
   * @param {Item} item
   */
  const handleTagToggle = (item) => {
    const existing = !!selectedTags.find((t) => t.id === item.id);
    if (existing) {
      removeSelectedTag(item);
      return;
    }

    selectedTags.push(item);
  };

  /**
   * @param {Item} item
   */
  const removeSelectedTag = (item) => {
    selectedTags = selectedTags.filter((t) => t.id !== item.id);
  };
</script>

<div class="block">
  <div class="field has-addons">
    <p class="control">
      <button
        class="button"
        aria-label="change sort order"
        onclick={() => {
          ascending = !ascending;
        }}
      >
        <span class="icon is-left">
          {#if ascending}
            <i class="fas fa-arrow-up-short-wide"></i>
          {:else}
            <i class="fas fa-arrow-up-wide-short"></i>
          {/if}
        </span>
      </button>
    </p>
    <Select options={ordinals} bind:value={orderBy} />
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
    <p class="control">
      <button
        class="button"
        aria-label="extra filters"
        onclick={() => {
          extraOptions = !extraOptions;
        }}
      >
        {#if extraOptions}
          <span class="icon is-right">
            <i class="fas fa-chevron-up"></i>
          </span>
        {:else}
          <span class="icon is-right">
            <i class="fas fa-chevron-down"></i>
          </span>
        {/if}
      </button>
    </p>
  </div>
</div>

{#if extraOptions}
  <div class="block">
    <ItemSelector
      placeholder="tag"
      items={tags}
      selectedItems={selectedTags}
      loading={loadingTags}
      toggle={handleTagToggle}
      disableCreate={true}
    />
    <div class="field is-grouped is-grouped-multiline">
      {#each selectedTags as tag}
        <div class="control">
          <div class="tags has-addons is-medium">
            <span class="tag">{tag.name}</span>

            <button
              class="tag is-delete"
              aria-label="remove {tag.name} from filter"
              onclick={() => removeSelectedTag(tag)}
            ></button>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
