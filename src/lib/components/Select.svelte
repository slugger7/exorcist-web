<script>
  let { options, value = $bindable(), ascending = $bindable(true) } = $props();

  const onClickHandler = (ordinal) => () => {
    if (value === ordinal.value) {
      ascending = !ascending;
    } else {
      ascending = !!ordinal.ascending;
    }
  };
</script>

<div class="control has-icons-left">
  <div class="select">
    <select bind:value>
      {#each options as o}
        <option onclick={onClickHandler(o)} value={o.value}>{o.text}</option>
      {/each}
    </select>
  </div>

  <span class="icon is-left">
    {#if ascending}
      <i class="fas fa-arrow-up-short-wide"></i>
    {:else}
      <i class="fas fa-arrow-up-wide-short"></i>
    {/if}
  </span>
</div>
