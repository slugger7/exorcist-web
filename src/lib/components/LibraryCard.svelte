<script>
  /** @type {{ name: String, id: string }}*/
  let { name, id } = $props();
</script>

<div class="card">
  <header class="card-header">
    <p class="card-header-title">{name}</p>
    <button class="card-header-icon" aria-label="more-options">
      <span class="icon">
        <i class="fa-solid fa-plus" aria-hidden="true"></i>
      </span>
    </button>
  </header>
</div>
