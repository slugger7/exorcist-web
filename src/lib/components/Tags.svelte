<script>
  import CreateTag from "./CreateTag.svelte";

  /** @import { TagDTO } from "../../dto"*/
  /**
   * @typedef props
   * @type {object}
   * @property {TagDTO[]} tags
   * @property {boolean} [editing]
   */
  /** @type {props}*/
  let { tags, editing = true } = $props();
</script>

<div>
  {#if editing}
    <CreateTag />
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
