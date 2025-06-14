<script>
  /**
   * @import { WSMessage, WSTopicMap } from "../lib/types"
   * @import { JobDTO, PageDTO } from '../dto'
   */
  import { onDestroy } from "svelte";
  import Pagination from "../lib/components/Pagination.svelte";
  import { getAll } from "../lib/controllers/job";
  import {
    getArrayOfStringsSearchParamOrDefault,
    getIntSearchParamOrDefault,
    getStringSearchParamOrDefault,
    setValueAndNavigate,
  } from "../lib/searchParams";
  import routes from "./routes";
  import { wsState } from "../lib/state/wsState.svelte";
  import { PONG } from "../lib/constants/websocket";
  import JobCard from "../lib/components/JobCard.svelte";

  let parent = $state(getStringSearchParamOrDefault("parent", ""));
  let statuses = $state(getArrayOfStringsSearchParamOrDefault("status", []));
  let types = $state(getArrayOfStringsSearchParamOrDefault("type", []));
  let page = $state(getIntSearchParamOrDefault("page", 1));
  let limit = $state(getIntSearchParamOrDefault("limit", 100));
  let loading = $state(false);
  let error = $state();
  /** @type {PageDTO<JobDTO>}*/
  let jobPage = $state();

  $inspect(jobPage);

  const syncJobs = async () => {
    console.log("syncing jobs");
    loading = true;
    try {
      jobPage = await getAll(page, limit, parent, statuses, types);
    } catch (e) {
      error = e;
    } finally {
      loading = false;
    }
  };

  $effect(() => {
    console.log("effecting jobs");
    syncJobs();
  });

  onDestroy(() => {
    if (!wsState.active || !wsState.connection) return;
    wsState.connection.removeEventListener("message", onmessage);
  });

  $effect(() => {
    if (!wsState.active || !wsState.connection) return;
    wsState.connection.addEventListener("message", onmessage);
  });

  $effect(() => {
    setValueAndNavigate("page", page.toString(), routes.jobs);
  });

  $effect(() => {
    setValueAndNavigate("limit", limit.toString(), routes.jobs, {
      replace: false,
    });
  });

  /** @param {MessageEvent<string>} e */
  const onmessage = (e) => {
    if (e.data === PONG) return;

    /** @type {WSMessage<JobDTO>}*/
    const data = JSON.parse(e.data);

    const topicFn = topics[data.topic];
    if (topicFn) {
      topicFn(data.data);
    }
  };

  /** @type {WSTopicMap<JobDTO>}*/
  const topics = {
    job_update: (job) => {
      jobPage.data = jobPage.data.map((j) => {
        if (j.id === job.id) {
          return job;
        }
        return j;
      });
    },
    job_create: (job) => {
      jobPage.total = jobPage.total + 1;
      jobPage.data.push(job);
    },
  };
</script>

<div class="container">
  <h1 class="title is-1">Jobs</h1>
  {#if loading}
    <p>loading</p>
  {:else if !error && jobPage}
    {#each jobPage.data as job (job.id)}
      <JobCard {job} />
    {:else}
      <p>No jobs here</p>
    {/each}

    <Pagination bind:page bind:limit total={jobPage.total} url={routes.jobs} />
    <div class="section"></div>
  {:else if error}
    <p>something went wrong ${error.message}</p>
  {/if}
</div>
