<script>
  import { Link } from "svelte-routing";
  import routes from "../../routes/routes";

  /** @type {{ name: string, id: string}}*/
  let { name, id } = $props();
</script>

<div class="card">
  <header class="card-header">
    <Link
      class="card-header-title"
      to={routes.libraryFunc(id, name)}
      state={{ libraryName: name }}>{name}</Link
    >
    <Link
      class="card-header-icon"
      aria-label="more-options"
      to={routes.edit.libraryFunc(id, name)}
      state={{ libraryName: name }}
    >
      <span class="icon">
        <i class="fa-solid fa-pen" aria-hidden="true"></i>
      </span>
    </Link>
  </header>
</div>
