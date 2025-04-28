<script>
  import { Link } from "svelte-routing";

  let { icon, ariaLabel, to, state = null } = $props();
</script>

<Link class="mt-2 button is-primary inline" aria-label={ariaLabel} {to} {state}>
  <span class="icon">
    <i class={icon}></i>
  </span>
</Link>
