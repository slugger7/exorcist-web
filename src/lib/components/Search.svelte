<script>
  /**
   * @import { ChangeEventHandler } from "svelte/elements";
   *
   * @typedef props
   * @type {object}
   * @property {string} [value]
   * @property {ChangeEventHandler<HTMLInputElement>} onkeyup
   * @property {Function} [onclear]
   */

  /** @type {props} */
  let { value = $bindable(""), onkeyup, onclear = () => {} } = $props();
</script>

<div class="field has-addons">
  <p class="control has-icons-left">
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
        class="button is-primary"
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
</div>
