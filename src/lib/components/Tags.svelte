<script>
  import CreateTag from "./ModifyTags.svelte";
  import { getAll } from "../controllers/tags";
  /** @import { TagDTO } from "../../dto"*/
  /**
   * @typedef props
   * @type {object}
   * @property {TagDTO[]} tags
   */
  /** @type {props}*/
  let { tags } = $props();

  let editing = $state(true);
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
</script>

<div>
  {#if editing}
    <CreateTag
      items={allTags}
      selectedItems={tags}
      loading={loadingTags}
      toggle={(item) => {
        console.log("item toggled", item);
      }}
    />
  {/if}
  <div class="field is-grouped is-grouped-multiline">
    {#each tags as tag}
      <div class="tags has-addons is-medium">
        <span class="tag is-link">{tag.name}</span>
        {#if editing}
          <button class="tag is-delete" aria-label="delete {tag.name} tag"
          ></button>
        {/if}
      </div>
    {/each}
  </div>
</div>
