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

  const syncJobs = async (page, limit, parent, statuses, types) => {
    loading = true;
    try {
      const jobs = await getAll(page, limit, parent, statuses, types);
      jobsState.page = jobs;

      return jobsState.page;
    } finally {
      loading = false;
    }
  };

  // onMount(async () => {
  //   await syncJobs();
  // });
</script>

<div class="container">
  <h1 class="title is-1">Jobs</h1>
  {#await syncJobs(page, limit, parent, statuses, types)}
    <p>loading</p>
  {:then jobsPage}
    <div class="block">
      <pre>{JSON.stringify(jobsPage, null, 2)}</pre>
    </div>
    <Pagination bind:page bind:limit total={jobsPage.total} url={routes.jobs} />
  {/await}
</div>
