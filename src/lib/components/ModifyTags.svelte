<script>
  /**
   * @import { Item } from "../types"
   * @typedef props
   * @type {object}
   * @property {boolean} loading
   * @property {Item[]} items
   * @property {Item[]} selectedItems
   * @property {Function} toggle
   */
  /** @type {props}*/
  let { loading, items, selectedItems, toggle } = $props();

  const itemsInViewCount = 5;

  let query = $state("");
  let active = $state(false);
  let itemsInView = $state([]);
  let selectedIndex = $state(null);
  let showCreateItem = $derived(query.length >= 1 && !items.find(item => item.name === query))
  let selectionBoundary = $derived(showCreateItem ? itemsInView.length : itemsInView.length - 1)

  $inspect(selectedIndex, query);
  $inspect(itemsInView);

  const onDropdownFocus = () => {
    active = true && itemsInView.length > 0;
  };

  const onDropdownBlur = () => {
    active = false;
  };

  const handleUpArrow = () => {
    if (selectedIndex === null) {
      selectedIndex = selectionBoundary;
    } else if (selectedIndex === 0) {
      selectedIndex = selectionBoundary;
    } else {
      selectedIndex--;
    }
  };

  const handleDownArrow = () => {
    if (selectedIndex === null) {
      selectedIndex = 0;
    } else if (selectedIndex === selectionBoundary) {
      selectedIndex = 0;
    } else {
      selectedIndex++;
    }
  };

  const handleEnter = () => {
    const item = itemsInView[selectedIndex];

    toggle(item);
  };

  const onKeyDown = (e) => {
    if (e.code === "ArrowUp") {
      e.preventDefault();
      return handleUpArrow();
    }
    if (e.code === "ArrowDown") {
      e.preventDefault();
      return handleDownArrow();
    }
    if (e.code === "Enter") {
      e.preventDefault();
      return handleEnter();
    }

    selectedIndex = 0;
    itemsInView = items
      .filter((t) =>
        t.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()),
      )
      .slice(0, itemsInViewCount);
    if (itemsInView.length > 0) {
      active = true;
    }

    if (items.length === 1) {
      selectedIndex = 0;
    }
  };

  const onQueryChange = (e) => {
    e.preventDefault();
    query = e.target.value;
  };

  /**
   * @param {Item} item
   */
  const itemInSelection = (item) =>
    selectedItems.find((selectedItem) => item.id === selectedItem.id);

</script>

<div class="field is-grouped">
  <div class="control">
    <div class="dropdown {active ? 'is-active' : ''}">
      <div class="dropdown-trigger">
        <input
          class="input"
          type="text"
          placeholder="new tag"
          value={query}
          onfocus={onDropdownFocus}
          onblur={onDropdownBlur}
          onkeydown={onKeyDown}
          oninput={onQueryChange}
        />
      </div>
      <div class="dropdown-menu" role="menu">
        <div class="dropdown-content">
          {#if loading}
            <p class="dropdown-item">Loading tags</p>
          {:else}
            {#each itemsInView as item, i (item.id)}
              <button
                class={`dropdown-item ${i === selectedIndex ? "is-active" : ""}`}
                onclick={() => {
                  console.log("Hello world");
                  toggle(item);
                }}
              >
                {#if itemInSelection(item)}
                  <span class="icon has-text-success"
                    ><i class="fas fa-square-check"></i></span
                  >
                {:else}
                  <span class="icon"><i class="far fa-square-check"></i></span>
                {/if}
                {item.name}</button
              >
            {/each}
            {#if showCreateItem}
              <hr class="dropdown-divider" />
              <button
                class={`dropdown-item ${selectedIndex === itemsInView.length ? "is-active" : ""}`}
                >Create {query}</button
              >
            {/if}
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
