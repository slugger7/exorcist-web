<script>
  import { Link } from "svelte-routing";

  let { icon, ariaLabel, to, state = null } = $props();
</script>

<Link class="mt-2 ml-1 button inline" aria-label={ariaLabel} {to} {state}>
  <span class="icon">
    <i class={icon}></i>
  </span>
</Link>
