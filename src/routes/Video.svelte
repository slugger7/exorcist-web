<script>
  /** @import { Item, MediaDTO } from "../lib/types";*/
  import { onDestroy, onMount } from "svelte";
  import { imageUrlById } from "../lib/controllers/image";
  import {
    videoUrlById,
    get,
    updateProgress,
    updateMedia,
  } from "../lib/controllers/media";
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
  import HeaderIconLink from "../lib/components/HeaderIconLink.svelte";
  import { nextFocusState } from "../lib/state/nextFocus.svelte";
  import { formatFileSize } from "../lib/formatting/filesize";
  import { formatRuntime } from "../lib/formatting/runtime";
  import HeaderIconButton from "../lib/components/HeaderIconButton.svelte";
  import EditHeading from "../lib/components/EditHeading.svelte";
  import { update } from "ramda";
  import { Link } from "svelte-routing";

  /** @type {{id: string}}*/
  let { id } = $props();
  /** @type {HTMLVideoElement}*/
  let videoNode = $state();
  /** @type {MediaDTO}*/
  let mediaEntity = $state();
  let loadingMedia = $state(false);
  let loadingProgress = $state(false);
  let editingTitle = $state(false);
  let loadingTitle = $state(false);

  let watchedPercentage = $derived(
    mediaEntity.progress / mediaEntity.video.runtime,
  );

  const fetchMedia = async () => {
    console.log("fetching media");
    loadingMedia = true;
    try {
      mediaEntity = await get(id);
    } finally {
      loadingMedia = false;
    }
  };

  onMount(() => {
    fetchMedia();
  });

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

  /** @param {KeyboardEvent} e*/
  const handleOnKeyUp = (e) => {
    switch (e.code) {
      case "Escape":
        if (nextFocusState.node) {
          nextFocusState.node.focus();
          nextFocusState.node = videoNode;
        }
        break;
      case "KeyL":
        console.log;
        videoNode.currentTime = videoNode.currentTime + 10;
        break;
      case "KeyJ":
        videoNode.currentTime = videoNode.currentTime - 10;
    }
  };

  const handleOnFocus = () => {
    if (!nextFocusState.node) {
      nextFocusState.node = videoNode;
    }
  };

  let progressTimeout;
  /** @param {Event} e*/
  const handleTimeUpdate = (e) => {
    clearTimeout(progressTimeout);
    progressTimeout = setTimeout(async () => {
      loadingProgress = true;
      try {
        const prog = await updateProgress(id, videoNode.currentTime);

        mediaEntity.progress = prog.progress;
      } finally {
        loadingProgress = false;
      }
    }, 1000);
  };

  const handleWatchedClick = async () => {
    let val = 0;
    if (watchedPercentage <= 0.9) {
      val = mediaEntity.video.runtime;
    }

    loadingProgress = true;
    try {
      const prog = await updateProgress(id, val, true);

      mediaEntity.progress = prog.progress;
    } finally {
      loadingProgress = false;
    }
  };

  /**
   * @param {Event} e
   * @param {String} updatedTitle
   */
  const handleTitleUpdate = async (e, updatedTitle) => {
    loadingTitle = true;
    try {
      const res = await updateMedia(id, { title: updatedTitle });

      mediaEntity.title = res.title;
      editingTitle = false;
    } finally {
      loadingTitle = false;
    }
  };
</script>

{#if loadingMedia}
  <p>loading</p>
{:else if mediaEntity}
  <div class="container is-fluid">
    {#if !mediaEntity.exists || mediaEntity.deleted}
      <section
        class={`hero ${mediaEntity.exists ? "is-warning" : "is-danger"}`}
      >
        <div class="hero-body">
          {#if !mediaEntity.exists && !mediaEntity.deleted}
            <p class="title">File deleted from disk</p>
            <p class="subtitle">
              The file has been deleted from disk outside of Exorcist
            </p>
          {:else if !mediaEntity.exists}
            <p class="title">File does not exist</p>
            <p class="subtitle">
              Not much we can do here but show you the information that remains
            </p>
          {:else}
            <p class="title">File exists but has been deleted</p>
            <p class="subtitle">
              Soon you will be able to restore deleted files that still exist.
              <br />
              You can permanently delete the files on disk by going through the delete
              flow again.
            </p>
          {/if}
        </div>
      </section>
      <br />
    {/if}
    <!-- svelte-ignore a11y_media_has_caption -->
    {#if mediaEntity.exists}
      <video
        src={videoUrlById(id)}
        controls
        poster={imageUrlById(mediaEntity.thumbnailId)}
        bind:this={videoNode}
        onkeyup={handleOnKeyUp}
        onfocus={handleOnFocus}
        ontimeupdate={handleTimeUpdate}
      ></video>
    {/if}

    <div class="container">
      <div class="field has-addons">
        {#if !mediaEntity.deleted && mediaEntity.exists}
          <p class="control">
            <Link class="button" to={routes.playlistAdd + `?media=${id}`}>
              <span class="icon">
                <i class="fas fa-plus"></i>
              </span>
            </Link>
          </p>
          <p class="control">
            <button
              class="button"
              onclick={handleWatchedClick}
              aria-label="toggle watched"
            >
              <span class="icon">
                <i
                  class={`fas ${watchedPercentage > 0.9 ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </span>
            </button>
          </p>
        {/if}
        {#if !mediaEntity.deleted || mediaEntity.exists}
          <p class="control">
            <Link
              class="button"
              to={routes.delete.mediaFunc(id, mediaEntity.title)}
            >
              <span class="icon">
                <i class="fas fa-trash"></i>
              </span>
            </Link>
          </p>
        {/if}
      </div>
      {#if editingTitle}
        <EditHeading
          value={mediaEntity.title}
          oncancel={() => (editingTitle = false)}
          onsave={handleTitleUpdate}
          loading={loadingTitle}
        />
      {:else}
        <h1 class="title is-1">
          {mediaEntity.title}
          <HeaderIconButton
            icon={`fas fa-pen`}
            iconClass={editingTitle ? "has-text-info" : ""}
            ariaLabel="edit title toggle"
            onclick={() => {
              editingTitle = !editingTitle;
            }}
          />
        </h1>
      {/if}
    </div>
    <br />
    <div class="container">
      <Items
        title="Tags"
        items={mediaEntity.tags}
        fetch={getAllTags}
        remove={async (tagId) => removeTag(id, tagId)}
        add={async (tagId) => addTag(id, tagId)}
        create={createTagHandler}
        urlFn={routes.tagFunc}
        disableEdit={mediaEntity.deleted}
      />
    </div>
    <br />
    <div class="container">
      <Items
        title="People"
        items={mediaEntity.people}
        fetch={getAllPeople}
        remove={async (personId) => removePerson(id, personId)}
        add={async (personId) => addPerson(id, personId)}
        create={createPersonHandler}
        urlFn={routes.personFunc}
        disableEdit={mediaEntity.deleted}
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
            <td>{mediaEntity.video.width}x{mediaEntity.video.height}</td>
          </tr>
          <tr>
            <td>Runtime</td>
            <td>{formatRuntime(mediaEntity.video.runtime)}</td>
          </tr>
          <tr>
            <td>Size</td>
            <td>{formatFileSize(mediaEntity.size)}</td>
          </tr>
          <tr>
            <td>Path</td>
            <td>{mediaEntity.path}</td>
          </tr>
          <tr>
            <td>Added</td>
            <td>{mediaEntity.added}</td>
          </tr>
          <tr>
            <td>Created</td>
            <td>{mediaEntity.created}</td>
          </tr>
          <tr>
            <td>Modified</td>
            <td>{mediaEntity.modified}</td>
          </tr>
          <tr>
            <td>Checksum</td>
            <td>{mediaEntity.checksum}</td>
          </tr>
          <tr>
            <td>Deleted</td>
            <td>{mediaEntity.deleted}</td>
          </tr>
          <tr>
            <td>Exists</td>
            <td>{mediaEntity.exists}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
{/if}

<style>
  video {
    height: 100%;
    width: 100%;
    max-height: 90vh;
  }
</style>
