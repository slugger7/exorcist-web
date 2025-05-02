<script>
  /**
   * @typedef props
   * @type {object}
   * @property {number} page
   * @property {number} limit
   * @property {number} total
   * @property {string} url
   */

  import { Link } from "svelte-routing";

  /** @type {props}*/
  let { page = $bindable(), limit = $bindable(), total, url } = $props();
  let pages = Math.trunc(total / limit);

  const urlForPage = (page) => `${url}?page=${page}&limit=${limit}`;

  const clickHandler = (pn) => () => {
    page = pn;
  };
</script>

{#snippet pageLine(pn)}
  <li>
    <Link
      to={urlForPage(pn)}
      onclick={clickHandler(pn)}
      class="pagination-link {page === pn ? 'is-current' : ''}"
      aria-label="Goto page {pn}">{pn}</Link
    >
  </li>
{/snippet}

<nav class="pagination is-centered" aria-label="pagination">
  {#if page - 1 > 1}
    <Link
      onclick={clickHandler(page - 1)}
      class="pagination-previous"
      to={urlForPage(page - 1)}>Previous</Link
    >
  {/if}
  {#if page + 1 <= pages}
    <Link
      onclick={clickHandler(page + 1)}
      class="pagination-next"
      to={urlForPage(page + 1)}>Next page</Link
    >
  {/if}
  <ul class="pagination-list">
    {@render pageLine(1)}

    {#if page <= 3}
      {@render pageLine(2)}
      {@render pageLine(3)}
      {@render pageLine(4)}
    {/if}

    {#if page > 3 && pages > 5}
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      {#if pages - page >= 3}
        {@render pageLine(page - 1)}
      {/if}
    {/if}

    {#if pages > 5 && page > 3 && pages - page >= 3}
      {@render pageLine(page)}
    {/if}

    {#if pages - page >= 3 && pages > 5}
      {#if page > 3}
        {@render pageLine(page + 1)}
      {/if}
      <li><span class="pagination-ellipsis">&hellip;</span></li>
    {/if}

    {#if pages - page < 3 && pages > 5}
      {@render pageLine(pages - 3)}
      {@render pageLine(pages - 2)}
      {@render pageLine(pages - 1)}
    {/if}

    {#if pages > 3}
      {@render pageLine(pages)}
    {/if}
  </ul>
</nav>
