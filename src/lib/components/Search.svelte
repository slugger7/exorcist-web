<script>
  /**
   * @import { ChangeEventHandler } from "svelte/elements";
   *
   * @typedef props
   * @type {object}
   * @property {string} [value]
   * @property {ChangeEventHandler<HTMLInputElement>} onkeyup
   */

  /** @type {props} */
  let { value = $bindable(""), onkeyup } = $props();
</script>

<div class="field">
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
</div>
