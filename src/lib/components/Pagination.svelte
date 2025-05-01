<script>
  /**
   * @typedef props
   * @type {object}
   * @property {number} [page]
   * @property {number} [limit]
   * @property {number} total
   * @property {string} url
   */

  import { Link } from "svelte-routing";

  /** @type {props}*/
  let { page = $bindable(1), limit = $bindable(100), total, url } = $props();
  let pages = Math.trunc(total / limit) + 1;

  console.log({ page, total, limit, pages });
  //const urlForPage = (page) => `${url}?page=${page}&limit=${limit}`;
</script>

{#snippet pageLine(pn)}
  <li>
    <button
      onclick={() => {
        page = pn;
      }}
      class="pagination-link {page === pn ? 'is-current' : ''}"
      aria-label="Goto page {pn}">{pn}</button
    >
  </li>
{/snippet}

<nav class="pagination is-centered" aria-label="pagination">
  <button
    class="pagination-previous"
    disabled={page === 1}
    onclick={() => {
      page = page - 1;
    }}>Previous</button
  >
  <button
    class="pagination-next"
    disabled={page === pages}
    onclick={() => (page = page + 1)}>Next page</button
  >
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
