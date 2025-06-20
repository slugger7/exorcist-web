<script>
    /** @import { Item } from "../lib/types";*/
  import { onDestroy } from "svelte";
  import { imageUrlById } from "../lib/controllers/image";
  import { videoUrlById, get } from "../lib/controllers/media";
  import Items from "../lib/components/Items.svelte";
  import { add, create, getAll, remove } from "../lib/controllers/tags";
  

  /** @type {{id: string}}*/
  let { id } = $props();

  onDestroy(() => {
    localStorage.setItem("item", id);
  });

  /** @param {string} tagName 
   * @returns {Promise<Item>}*/
  const createTag = async (tagName) => {
    const createdTags = await create([tagName])

    if (createdTags.length > 0) {
        return createdTags[0]
    }

    throw Error("No tags returned after create")
  }
</script>

{#await get(id)}
  <p>loading</p>
{:then { thumbnailId, title, tags }}
  <div class="container is-fluid">
    <!-- svelte-ignore a11y_media_has_caption -->
    <video src={videoUrlById(id)} controls poster={imageUrlById(thumbnailId)}
    ></video>

    <div class="container">
      <h1 class="title is-1">{title}</h1>
    </div>
    <br />
    <div class="container">
      <Items
        title="Tags"
        items={tags}
        fetch={async () => getAll()}
        remove={async (tagId) => remove(id, tagId)}
        add={async (tagId) => add(id, tagId)}
        create={createTag}
      />
    </div>
    <div class="section"></div>
  </div>
{:catch}
  <p>something went wrong</p>
{/await}

<style>
  video {
    height: 100%;
    width: 100%;
    max-height: 90vh;
  }
</style>
