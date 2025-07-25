<script>
  /** @import { Item } from "../lib/types";*/
  import { onDestroy } from "svelte";
  import { imageUrlById } from "../lib/controllers/image";
  import { videoUrlById, get } from "../lib/controllers/media";
  import Items from "../lib/components/Items.svelte";
  import {
    add as addTag,
    create as createTags,
    getAll as getAllTags,
    remove as removeTag,
  } from "../lib/controllers/tags";
  import {
    getAll as getAllPeople,
    add as addPerson,
    create as createPeople,
    remove as removePerson,
  } from "../lib/controllers/people";
  import routes from "./routes";

  /** @type {{id: string}}*/
  let { id } = $props();

  onDestroy(() => {
    localStorage.setItem("item", id);
  });

  /** @param {string} tagName
   * @returns {Promise<Item>}*/
  const createTagHandler = async (tagName) => {
    const createdTags = await createTags([tagName]);

    if (createdTags.length > 0) {
      return createdTags[0];
    }

    throw Error("No tags returned after create");
  };

  /** @param {string} personName
   * @returns {Promise<Item>}
   */
  const createPersonHandler = async (personName) => {
    const createdPeople = await createPeople([personName]);

    if (createdPeople.length > 0) {
      return createdPeople[0];
    }

    throw Error("No people returned after create");
  };
</script>

{#await get(id)}
  <p>loading</p>
{:then { thumbnailId, title, tags, people, path, size, added, created, modified, checksum, video }}
  <div class="container is-fluid">
    <!-- svelte-ignore a11y_media_has_caption -->
    <video src={videoUrlById(id)} controls poster={imageUrlById(thumbnailId)}
    ></video>

    <div class="container">
      <h1 class="title is-1">{title}</h1>
    </div>
    <br />
    <div class="section">
      <Items
        title="Tags"
        items={tags}
        fetch={getAllTags}
        remove={async (tagId) => removeTag(id, tagId)}
        add={async (tagId) => addTag(id, tagId)}
        create={createTagHandler}
        urlFn={routes.tagFunc}
      />
    </div>
    <div class="section">
      <Items
        title="People"
        items={people}
        fetch={getAllPeople}
        remove={async (personId) => removePerson(id, personId)}
        add={async (personId) => addPerson(id, personId)}
        create={createPersonHandler}
        urlFn={routes.personFunc}
      />
    </div>
    <div class="section">
      <table class="table">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dimensions</td>
            <td>{video.width}x{video.height}</td>
          </tr>
          <tr>
            <td>Runtime</td>
            <td>{video.runtime}</td>
          </tr>
          <tr>
            <td>Size</td>
            <td>{size}</td>
          </tr>
          <tr>
            <td>Path</td>
            <td>{path}</td>
          </tr>
          <tr>
            <td>Added</td>
            <td>{added}</td>
          </tr>
          <tr>
            <td>Created</td>
            <td>{created}</td>
          </tr>
          <tr>
            <td>Modified</td>
            <td>{modified}</td>
          </tr>
          <tr>
            <td>Checksum</td>
            <td>{checksum}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
