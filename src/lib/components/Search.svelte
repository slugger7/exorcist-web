<script>
  import { getAll as getAllTags } from "../controllers/tags";
  import { getAll as getAllPeople } from "../controllers/people";
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
   * @property {boolean} [disableTags]
   * @property {boolean} [disablePeople]
   * @property {boolean} [ascending]
   * @property {string[]} [selectedTags]
   * @property {string[]} [selectedPeople]
   */

  /** @type {props} */
  let {
    value = $bindable(""),
    onkeyup,
    onclear = () => {},
    ordinals,
    orderBy = $bindable(),
    ascending = $bindable(),
    selectedTags = $bindable([]),
    selectedPeople = $bindable([]),
    disablePeople = false,
    disableTags = false,
  } = $props();

  let extraOptions = $state(false);
  /** @type {Item[]}*/
  let tags = $state([]);
  let loadingTags = $state(false);
  let people = $state([]);
  let loadingPeople = $state(false);

  const fetchTags = async () => {
    loadingTags = true;
    try {
      tags = await getAllTags();
    } finally {
      loadingTags = false;
    }
  };

  const fetchPeople = async () => {
    loadingPeople = true;
    try {
      people = await getAllPeople();
    } finally {
      loadingPeople = false;
    }
  };

  $effect(() => {
    if (extraOptions && tags.length === 0) {
      fetchTags();
    }
  });

  $effect(() => {
    if (extraOptions && people.length === 0) {
      fetchPeople();
    }
  });

  /**
   * @param {Item} item
   */
  const handleTagToggle = (item) => {
    const existing = !!selectedTags.find((t) => t === item.name);
    if (existing) {
      removeSelectedTag(item);
      return;
    }

    selectedTags.push(item.name);
  };

  /**
   * @param {Item} item
   */
  const handlePersonToggle = (item) => {
    const existing = !!selectedPeople.find((t) => t === item.name);
    if (existing) {
      removeSelectedPerson(item);
      return;
    }

    selectedPeople.push(item.name);
  };

  /**
   * @param {{name: string}} item
   */
  const removeSelectedTag = (item) => {
    selectedTags = selectedTags.filter((t) => t !== item.name);
  };

  /**
   * @param {{name: string}} item
   */
  const removeSelectedPerson = (item) => {
    selectedPeople = selectedPeople.filter((t) => t !== item.name);
  };

  /**
   *
   * @param {string[]} selectedItems
   * @param {Item[]} items
   * @returns {Item[]}
   */
  const hydrateItems = (selectedItems, items) =>
    selectedItems.map((s) => items.find((i) => i.name === s)).filter((s) => s);
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
    {#if !disableTags}
      <ItemSelector
        placeholder="tag"
        items={tags}
        selectedItems={hydrateItems(selectedTags, tags)}
        loading={loadingTags}
        toggle={handleTagToggle}
        disableCreate={true}
      />
      <div class="field is-grouped is-grouped-multiline">
        {#each selectedTags as tag}
          <div class="control">
            <div class="tags has-addons is-medium">
              <span class="tag">{tag}</span>

              <button
                class="tag is-delete"
                aria-label="remove {tag} from filter"
                onclick={() => removeSelectedTag({ name: tag })}
              ></button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
    {#if !disablePeople}
      <ItemSelector
        placeholder="people"
        items={people}
        selectedItems={hydrateItems(selectedPeople, people)}
        loading={loadingPeople}
        toggle={handlePersonToggle}
        disableCreate={true}
      />
      <div class="field is-grouped is-grouped-multiline">
        {#each selectedPeople as person}
          <div class="control">
            <div class="tags has-addons is-medium">
              <span class="tag">{person}</span>

              <button
                class="tag is-delete"
                aria-label="remove {person} from filter"
                onclick={() => removeSelectedPerson({ name: person })}
              ></button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
{/if}
