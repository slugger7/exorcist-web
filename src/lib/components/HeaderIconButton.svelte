<script>
  /**
   * @import { MouseEventHandler } from "svelte/elements";
   * @typedef props
   * @type {object}
   * @property {string} icon
   * @property {string} ariaLabel
   * @property {string} [iconClass]
   * @property {string} [buttonClass]
   * @property {MouseEventHandler<HTMLButtonElement>} onclick
   */

  /** @type {props}*/
  let { icon, ariaLabel, onclick, iconClass = "", buttonClass = "" } = $props();
</script>

<button class={`mt-2 ml-1 button inline ${buttonClass}`} aria-label={ariaLabel} {onclick}>
  <span class={`icon ${iconClass}`}>
    <i class={icon}></i>
  </span>
</button>
