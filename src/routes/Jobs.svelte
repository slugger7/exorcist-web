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

  onMount(async () => {
    const jobs = await getAll(page, limit, parent, statuses, types);

    jobsState.page = jobs;
  });
</script>

<div class="container">
  <h1 class="title is-1">Jobs</h1>
  <pre>{JSON.stringify(jobsState.page, null, 2)}</pre>
</div>
<!-- 
<div class="container">
  <h1 class="title is-1">Jobs</h1>
  {#await getAll(parent, statuses)}
    <p>loading</p>
  {:then jobsPage}
    <pre>{JSON.stringify(jobsPage, null, 2)}</pre>
    <Pagination bind:page bind:limit total={jobsPage.total} url={routes.jobs} />
  {:catch}
    <p>something went wrong</p>
  {/await}
</div> -->
