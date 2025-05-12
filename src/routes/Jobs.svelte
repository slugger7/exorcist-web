<script>
  import { onMount } from "svelte";
  import Pagination from "../lib/components/Pagination.svelte";
  import { getAll } from "../lib/controllers/job";
  import {
    getArrayOfStringsSearchParamOrDefault,
    getIntSearchParamOrDefault,
    getStringSearchParamOrDefault,
  } from "../lib/searchParams";
  import routes from "./routes";
  import { jobsState } from "../lib/state/jobState.svelte";

  let parent = $state(getStringSearchParamOrDefault("parent", ""));
  let statuses = $state(getArrayOfStringsSearchParamOrDefault("status", []));
  let types = $state(getArrayOfStringsSearchParamOrDefault("type", []));
  let page = $state(getIntSearchParamOrDefault("page", 1));
  let limit = $state(getIntSearchParamOrDefault("limit", 100));
  let loading = $state(false);
  let error = $state()

  const syncJobs = async () => {
    loading = true;
    try {
      const jobs = await getAll(page, limit, parent, statuses, types);
      jobsState.page = jobs;

      return jobsState.page;
    } catch (e) {
      error = e
    } finally {
      loading = false;
    }
  };

  onMount(async () => {
    await syncJobs();
  });
</script>

<div class="container">
  <h1 class="title is-1">Jobs</h1>
  {#if loading}
    <p>loading</p>
  {:else if !error}
    <div class="block">
      <pre>{JSON.stringify(jobsState.page, null, 2)}</pre>
    </div>
    <Pagination bind:page bind:limit total={jobsState.page.total} url={routes.jobs} onchange={syncJobs}/>
    {:else}
    <p>something went wrong ${error.message}</p>
  {/if}
</div>
