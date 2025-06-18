<script>
  import ModifyTags from "./ModifyTags.svelte";
  import { getAll, remove } from "../controllers/tags";
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

  const handleRemoveTag = (tag) => async () => {
    // a cool strat could be to remove the tag first from the list then fire it off to the backend
    // if there is an issue with the backend then we can revert this in the catch block.
    try {
      await remove(mediaId, tag.id)
      // remove tag from list of tags that are on the media
    } catch (e) {
      console.error(e)
    }
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
            onclick={handleRemoveTag(tag)}
            ></button>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
