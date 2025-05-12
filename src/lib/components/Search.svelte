<script>
  import Select from "./Select.svelte";

  /**
   * @import { ChangeEventHandler } from "svelte/elements";
   *
   * @typedef props
   * @type {object}
   * @property {string} [value]
   * @property {ChangeEventHandler<HTMLInputElement>} onkeyup
   * @property {Function} [onclear]
   * @property {any} ordinals
   * @property {string} orderBy
   * @property {boolean} [ascending]
   */

  /** @type {props} */
  let {
    value = $bindable(""),
    onkeyup,
    onclear = () => {},
    ordinals,
    orderBy = $bindable(),
    ascending = $bindable(),
  } = $props();
</script>

<div class="field has-addons">
  <Select options={ordinals} bind:value={orderBy} bind:ascending />
  <p class="control has-icons-left is-expanded">
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
        class="button"
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
