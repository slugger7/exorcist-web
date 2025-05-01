<script>
    /**
     * @typedef props
     * @type {object}
     * @property {number} [page]
     * @property {number} [limit]
     * @property {number} [skip]
     * @property {number} total
     * @property {string} url
     */

     /** @type {props}*/
    let {page = 1, limit = 48, skip = 0, total, url} = $props()
    let pages = 3
    const urlForPage = (page) => (`${url}/?page=${page}&limit=${limit}&skip=${skip}`)
</script>

{#snippet pageLine(pn)}
<li><a href={urlForPage(pn)} class="pagination-link {page === pn ? "is-current":""}" aria-label="Goto page {pn}">{pn}</a></li>
{/snippet}

<nav class="pagination is-centered" aria-label="pagination">
  <button class="pagination-previous" disabled={page === 1}>Previous</button>
  <button class="pagination-next">Next page</button>
  <ul class="pagination-list">
    {@render pageLine(1)}

    {#if page <= 3 && pages > 3}
      {@render pageLine(2)}
      {@render pageLine(3)}
    {/if}

    {#if pages > 5 && page > 3} 
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        {@render pageLine(page - 1)}
        
    {/if}

    {#if page > 3}
      {@render pageLine(page)}
    {/if}

    {#if pages - page > 3 && page != pages}
      {@render pageLine(page + 1)}
      <li><span class="pagination-ellipsis">&hellip;</span></li>
    {/if}

    {#if pages - page <= 3 && pages > 3}
      {@render pageLine(pages - 2)}
      {@render pageLine(pages - 1)}
    {/if}

    {@render pageLine(pages)}
  </ul>
</nav>
