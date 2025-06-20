<script>
  import ModifyItems from "./ModifyItems.svelte";
  import HeaderIconButton from "./HeaderIconButton.svelte";
  /** 
   * @import { Item, FetchItems, RemoveItem, AddItem, CreateItem } from '../types'
   * 
   * @typedef props
   * @type {object}
   * @property {string} title
   * @property {Item[]} items
   * @property {FetchItems} fetch
   * @property {RemoveItem} remove
   * @property {AddItem} add
   * @property {CreateItem} create
   */
  /** @type {props}*/
  let { title, items, fetch, remove, add, create } = $props();

  let editing = $state(false);
  let selectedItems = $state([]);
  let allItems = $state([]);
  let loadingItems = $state(false);
  let itemsError = $state();

  /**
   * @param {Item[]} items
   * @returns {Item[]}
   */
  const sortItems = (items) =>
    items.sort((a, b) => (a.name === b.name ? 0 : a.name < b.name ? -1 : 1));

  $effect(() => {
    if (items !== null && items !== undefined) {
      selectedItems = [...sortItems(items)];
    }
  });

  const refreshItems = async () => {
    loadingItems = true;
    try {
      const items = await fetch()
      allItems = sortItems(items);
    } catch {
      itemsError = "could not fetch tags";
    } finally {
      loadingItems = false;
    }
  };

  $effect(() => {
    if (editing === true) {
      refreshItems();
    }
  });

  /**
   * @param {Item} item
   */
  const handleItemToggle = (item) => {
    const existing = !!selectedItems.find((t) => t.id === item.id);
    if (existing) {
      removeItem(item);
      return;
    }

    addTag(item);
  };

  const addTag = async (tag) => {
    selectedItems.push(tag);

    try {
      await add(tag.id);
    } catch (e) {
      console.error(e);

      await refreshItems();
    }
  };


  /** @param {Item} item */
  const removeItem = async (item) => {
    selectedItems = selectedItems.filter((t) => t.id !== item.id);

    try {
      await remove(item.id);
    } catch (e) {
      console.error(e);

      await refreshItems();
    }
  };

  /** @param {Item} item*/
  const handleRemoveItem = (item) => async () => {
    removeItem(item);
  };

  /** @param {string} itemName */
  const handleCreateItem = async (itemName) => {
    try {
      const createdTag = await create(itemName);

      allItems.push(createdTag);
      allItems = sortItems(allItems)
      addTag(createdTag);
    } catch (e) {
      console.error(e);
    }
  };
</script>

<div>
  <h2 class="title is-2 inline">{title}</h2>
  <HeaderIconButton
    icon="fas fa-pen-to-square"
    ariaLabel="edit tags"
    iconClass={editing ? "has-text-info" : ""}
    buttonClass="mb-2"
    onclick={() => (editing = !editing)}
  />
  {#if editing}
    <ModifyItems
      items={allItems}
      selectedItems={selectedItems}
      loading={loadingItems}
      toggle={handleItemToggle}
      create={handleCreateItem}
    />
  {/if}
  <div class="field is-grouped is-grouped-multiline">
    {#each selectedItems as tag}
      <div class="control">
        <div class="tags has-addons is-medium">
          <span class="tag is-link">{tag.name}</span>
          {#if editing}
            <button
              class="tag is-delete"
              aria-label="delete {tag.name} tag"
              onclick={handleRemoveItem(tag)}
            ></button>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
