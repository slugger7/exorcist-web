<script>
  /** @import { TagDTO } from "../../dto" */
  import { onMount } from "svelte";
  import { getAll } from "../controllers/tags";

  /** @type {TagDTO[]}*/
  let tags = $state([]);
  let loadingTags = $state(false);
  let tagsError = $state(null);

  let active = $state(false);
  let items = $state([]);

  const fetchTags = async () => {
    loadingTags = true;
    try {
      tags = await getAll();
    } catch {
      tagsError = "could not fetch tags";
    } finally {
      loadingTags = false;
    }
  };

  onMount(() => {
    fetchTags();
  });

  const onDropdownFocus = () => {
    active = true && items.length > 0;
  };

  const onDropdownBlur = () => {
    active = false;
  };

  const onKeyUp = (e) => {
    if (e.code === "ArrowUp") {
      console.log("Arrow Up");
    }
    if (e.code === "ArrowDown") {
      console.log("ArrowDown");
    }
    if (e.code === "Enter") {
      console.log("Enter");
    }

    items = tags
      .filter((t) => t.name.toLocaleLowerCase().includes(e.target.value))
      .slice(0, 5);
    if (items.length > 0) {
      active = true;
    }
  };
</script>

<div class="field is-grouped">
  <div class="control is-expanded">
    <div class="dropdown {active ? 'is-active' : ''}">
      <div class="dropdown-trigger">
        <input
          class="input"
          type="text"
          placeholder="new tag"
          onfocus={onDropdownFocus}
          onblur={onDropdownBlur}
          onkeyup={onKeyUp}
        />
      </div>
      <div class="dropdown-menu">
        <div class="dropdown-content">
          {#if loadingTags}
            <p class="dropdown-item">Loading tags</p>
          {:else}
            {#each items as tag}
              <button class="dropdown-item"
                ><span class="icon has-text-danger"
                  ><i class="fas fa-trash"></i></span
                >{tag.name}</button
              >
            {/each}
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
