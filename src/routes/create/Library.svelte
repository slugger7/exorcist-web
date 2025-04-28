<script>
  import { navigate } from "svelte-routing";
  import { create } from "../../lib/controllers/libraries";
  import routes from "../routes";

  let libraryName = $state("");
  let loading = $state(false);

  async function handleSubmit(e) {
    e.preventDefault();
    loading = true;

    try {
      const library = await create(libraryName);

      navigate(routes.libraries);
    } catch (e) {
      console.error(e);
    } finally {
      loading = false;
    }
  }
</script>

<div class="container">
  <h1 class="title is-1">Create Library</h1>
  <form onsubmit={handleSubmit}>
    <div class="field">
      <label class="label" for="library-name">Library Name</label>
      <div class="control">
        <input
          class="input"
          name="library-name"
          bind:value={libraryName}
          placeholder="Library name"
        />
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-primary {loading ? 'is-loading' : ''}"
          >Create</button
        >
      </div>
      <div class="control">
        <button
          class="button {loading ? 'is-loading' : ''}"
          onclick={() => navigate(routes.libraries)}>Cancel</button
        >
      </div>
    </div>
  </form>
</div>
