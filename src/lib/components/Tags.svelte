<script>
  import ModifyTags from "./ModifyTags.svelte";
  import { add, create, getAll, remove } from "../controllers/tags";
  import HeaderIconButton from "./HeaderIconButton.svelte";
  /** @import { TagDTO } from "../../dto"*/
  /**
   * @typedef props
   * @type {object}
   * @property {TagDTO[]} tags
   * @property {string} mediaId
   */
  /** @type {props}*/
  let { tags, mediaId } = $props();

  let editing = $state(false);
  let selectedTags = $state([]);
  let allTags = $state([]);
  let loadingTags = $state(false);
  let tagsError = $state();

  /**
   * @param {TagDTO[]} items
   * @returns {TagDTO[]}
   */
  const sortTags = (items) =>
    items.sort((a, b) => (a.name === b.name ? 0 : a.name < b.name ? -1 : 1));

  $effect(() => {
    if (tags !== null && tags !== undefined) {
      selectedTags = [...sortTags(tags)];
    }
  });

  const fetchTags = async () => {
    loadingTags = true;
    try {
      const items = await getAll();
      allTags = sortTags(items);
    } catch {
      tagsError = "could not fetch tags";
    } finally {
      loadingTags = false;
    }
  };

  $effect(() => {
    if (editing === true) {
      fetchTags();
    }
  });

  const handleItemToggle = (item) => {
    const existing = !!selectedTags.find((t) => t.id === item.id);
    if (existing) {
      removeTag(item);
      return;
    }

    addTag(item);
  };

  const addTag = async (tag) => {
    selectedTags.push(tag);

    try {
      await add(mediaId, tag.id);
    } catch (e) {
      console.error(e);

      await fetchTags();
    }
  };

  const removeTag = async (tag) => {
    selectedTags = selectedTags.filter((t) => t.id !== tag.id);

    try {
      await remove(mediaId, tag.id);
    } catch (e) {
      console.error(e);

      await fetchTags();
    }
  };

  const handleRemoveTag = (tag) => async () => {
    removeTag(tag);
  };

  const handleCreateTag = async (tagName) => {
    try {
      const createdTags = await create([tagName]);

      if (createdTags.length > 0) {
        const createdTag = createdTags[0];
        allTags.push(createdTag);
        addTag(createdTag);
      }
    } catch (e) {
      console.error(e);
    }
  };
</script>

<div>
  <h2 class="title is-2 inline">Tags</h2>
  <HeaderIconButton
    icon="fas fa-pen-to-square"
    ariaLabel="edit tags"
    iconClass={editing ? "has-text-info" : ""}
    buttonClass="mb-2"
    onclick={() => (editing = !editing)}
  />
  {#if editing}
    <ModifyTags
      items={allTags}
      selectedItems={selectedTags}
      loading={loadingTags}
      toggle={handleItemToggle}
      createTag={handleCreateTag}
    />
  {/if}
  <div class="field is-grouped is-grouped-multiline">
    {#each selectedTags as tag}
      <div class="control">
        <div class="tags has-addons is-medium">
          <span class="tag is-link">{tag.name}</span>
          {#if editing}
            <button
              class="tag is-delete"
              aria-label="delete {tag.name} tag"
              onclick={handleRemoveTag(tag)}
            ></button>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
