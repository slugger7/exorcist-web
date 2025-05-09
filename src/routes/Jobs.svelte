<script>
  import Pagination from "../lib/components/Pagination.svelte";
  import { getAll } from "../lib/controllers/job";
  import {
    getArrayOfStringsSearchParamOrDefault,
    getIntSearchParamOrDefault,
    getStringSearchParamOrDefault,
  } from "../lib/searchParams";
  import routes from "./routes";

  let parent = $state(getStringSearchParamOrDefault("parent", ""));
  let statuses = $state(getArrayOfStringsSearchParamOrDefault("statuses", []));
  let page = $state(getIntSearchParamOrDefault("page", 1));
  let limit = $state(getIntSearchParamOrDefault("limit", 100));
</script>

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
</div>
