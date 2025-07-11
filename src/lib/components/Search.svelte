<script>
  import Select from "./Select.svelte";

  /**
   * @import { ChangeEventHandler } from "svelte/elements";
   * @import { Ordinal } from "../types"
   *
   * @typedef props
   * @type {object}
   * @property {string} [value]
   * @property {ChangeEventHandler<HTMLInputElement>} onkeyup
   * @property {Function} [onclear]
   * @property {Ordinal[]} ordinals
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
  <p class="control">
    <button
      class="button"
      aria-label="change sort order"
      onclick={() => {
        ascending = !ascending;
      }}
    >
      <span class="icon is-left">
        {#if ascending}
          <i class="fas fa-arrow-up-short-wide"></i>
        {:else}
          <i class="fas fa-arrow-up-wide-short"></i>
        {/if}
      </span>
    </button>
  </p>
  <Select options={ordinals} bind:value={orderBy} />
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
