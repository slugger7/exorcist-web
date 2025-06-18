<script>
  import ModifyTags from "./ModifyTags.svelte";
  import { getAll } from "../controllers/tags";
  import HeaderIconButton from "./HeaderIconButton.svelte";
  /** @import { TagDTO } from "../../dto"*/
  /**
   * @typedef props
   * @type {object}
   * @property {TagDTO[]} tags
   */
  /** @type {props}*/
  let { tags } = $props();

  let editing = $state(false);
  let allTags = $state([]);
  let loadingTags = $state(false);
  let tagsError = $state();

  const fetchTags = async () => {
    loadingTags = true;
    try {
      allTags = await getAll();
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
    console.log({item})
  }
</script>

<div>
  <h2 class="title is-2 inline">Tags</h2>
  <HeaderIconButton
    icon="fas fa-pen-to-square"
    ariaLabel="edit tags"
    iconClass={editing ? "has-text-info": ""}
    buttonClass="mb-2"
    onclick={() => editing = !editing} />
  {#if editing}
    <ModifyTags
      items={allTags}
      selectedItems={tags}
      loading={loadingTags}
      toggle={handleItemToggle}
    />
  {/if}
  <div class="field is-grouped is-grouped-multiline">
    {#each tags as tag}
      <div class="control">
        <div class="tags has-addons is-medium">
          <span class="tag is-link">{tag.name}</span>
          {#if editing}
            <button class="tag is-delete" aria-label="delete {tag.name} tag"
            ></button>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
