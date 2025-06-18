<script>
  /**
   * @import { Item } from "../../lib/types"
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

  $inspect(query);

  const onDropdownFocus = () => {
    active = true && items.length > 0;
  };

  const onDropdownBlur = () => {
    active = false;
  };

  const handleUpArrow = () => {
    if (selectedIndex === null) {
      selectedIndex = itemsInView.length + 1;
    } else if (selectedIndex === 0) {
      selectedIndex = itemsInView.length + 1;
    } else {
      selectedIndex--;
    }
  };

  const handleDownArrow = () => {
    if (selectedIndex === null) {
      selectedIndex = 0;
    } else if (selectedIndex === itemsInView.length + 1) {
      selectedIndex = 0;
    } else {
      selectedIndex++;
    }
  };

  const handleEnter = () => {
    const item = itemsInView[selectedIndex];

    toggle(item);
  };

  const onKeyUp = (e) => {
    if (e.code === "ArrowUp") {
      return handleUpArrow();
    }
    if (e.code === "ArrowDown") {
      return handleDownArrow();
    }
    if (e.code === "Enter") {
      return handleEnter();
    }

    selectedIndex = null;
    itemsInView = items
      .filter((t) => t.name.toLocaleLowerCase().includes(e.target.value))
      .slice(0, itemsInViewCount);
    if (items.length > 0) {
      active = true;
    }

    if (items.length === 1) {
      selectedIndex = 0;
    }
  };

  const onQueryChange = (e) => {
    query = e.target.value;
  };

  /**
   * @param {Item} item
   */
  const itemInSelection = (item) =>
    selectedItems.find((selectedItem) => item.id === selectedItem.id);
</script>

<div class="field is-grouped">
  <div class="control is-expanded">
    <div class="dropdown {active ? 'is-active' : ''}">
      <div class="dropdown-trigger">
        <input
          class="input"
          type="text"
          placeholder="new tag"
          value={query}
          onfocus={onDropdownFocus}
          onblur={onDropdownBlur}
          onkeyup={onKeyUp}
          onchange={onQueryChange}
        />
      </div>
      <div class="dropdown-menu">
        <div class="dropdown-content">
          {#if loading}
            <p class="dropdown-item">Loading tags</p>
          {:else}
            {#each itemsInView as item, i (item.id)}
              <button
                class={`dropdown-item ${i === selectedIndex ? "is-active" : ""}`}
                onclick={() => toggle(item)}
              >
                {#if itemInSelection(item)}
                  <span class="icon has-text-success"
                    ><i class="fas fa-square-check"></i></span
                  >
                {/if}
                {item.name}</button
              >
            {/each}
            {#if query.length >= 1}
              <button
                class={`dropdown-item ${selectedIndex === itemsInViewCount + 1}`}
                >Create {query}</button
              >
            {/if}
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
