<script>
  /** @import { Job, WSMessage, Page } from "../lib/types"*/
  import { onDestroy, onMount } from "svelte";
  import Pagination from "../lib/components/Pagination.svelte";
  import { getAll } from "../lib/controllers/job";
  import {
    getArrayOfStringsSearchParamOrDefault,
    getIntSearchParamOrDefault,
    getStringSearchParamOrDefault,
  } from "../lib/searchParams";
  import routes from "./routes";
  import { wsState } from "../lib/state/wsState.svelte";

  let parent = $state(getStringSearchParamOrDefault("parent", ""));
  let statuses = $state(getArrayOfStringsSearchParamOrDefault("status", []));
  let types = $state(getArrayOfStringsSearchParamOrDefault("type", []));
  let page = $state(getIntSearchParamOrDefault("page", 1));
  let limit = $state(getIntSearchParamOrDefault("limit", 100));
  let loading = $state(false);
  let error = $state()
  /** @type {Page<Job>}*/
  let jobPage = $state()

  const syncJobs = async () => {
    loading = true;
    try {
      jobPage = await getAll(page, limit, parent, statuses, types);
    } catch (e) {
      error = e
    } finally {
      loading = false;
    }
  };

  onMount(async () => {
    await syncJobs();

    wsState.connection.addEventListener("message", onmessage)
  });

  onDestroy(() => {
    wsState.connection.removeEventListener("message", onmessage)
  })

  /** @param {MessageEvent<any>} e */
  const onmessage = (e) => {
    if (e.data === "pong") return

    /** @type {WSMessage}*/
    const data = JSON.parse(e.data)

    const topic = topics[data.topic]
    if (topic) {
      topic(data.data)
    }
  }

  const topics = {

	"job_update": (job) => {
		jobPage.data = jobPage.data.map(j => {
			if (j.id === job.id) {
				return job
			}
			return j
		})
	},
	"job_create": (job) => {
		jobPage.total = jobPage.total + 1
		jobPage.data.push(job)
	}
}
</script>

<div class="container">
  <h1 class="title is-1">Jobs</h1>
  {#if loading}
    <p>loading</p>
  {:else if !error}
    <div class="block">
      <pre>{JSON.stringify(jobPage, null, 2)}</pre>
    </div>
    <Pagination bind:page bind:limit total={jobPage.total} url={routes.jobs} onchange={syncJobs}/>
    {:else}
    <p>something went wrong ${error.message}</p>
  {/if}
</div>
