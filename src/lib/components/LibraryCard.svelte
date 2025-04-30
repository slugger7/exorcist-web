<script>
  import { Link } from "svelte-routing";
  import routes from "../../routes/routes";

  /** @type {{ name: string, id: string}}*/
  let { name, id } = $props();
</script>

<div class="card">
  <header class="card-header">
    <Link class="card-header-title" to={routes.libraryFunc(id)}>{name}</Link>
    <Link
      class="card-header-icon"
      aria-label="more-options"
      to={routes.create.libraryPathFunc(id)}
      state={{ libraryName: name }}
    >
      <span class="icon">
        <i class="fa-solid fa-plus" aria-hidden="true"></i>
      </span>
    </Link>
  </header>
</div>
