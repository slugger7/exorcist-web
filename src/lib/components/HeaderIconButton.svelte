<script>
  /**
   * @import { MouseEventHandler } from "svelte/elements";
   * @typedef props
   * @type {object}
   * @property {string} icon
   * @property {string} ariaLabel
   * @property {MouseEventHandler<HTMLButtonElement>} onclick
   */

  /** @type {props}*/
  let { icon, ariaLabel, onclick } = $props();
</script>

<button class="mt-2 ml-1 button inline" aria-label={ariaLabel} {onclick}>
  <span class="icon">
    <i class={icon}></i>
  </span>
</button>
