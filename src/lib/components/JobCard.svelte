<script>
  import JobStatusTag from "./JobStatusTag.svelte";

  /** @import { Job } from "../../lib/types"*/
  /** @type {{job: Job}}*/
  let { job } = $props();
</script>

<div class="card">
  <pre>{JSON.stringify(job, null, 2)}</pre>
  <header class="card-header">
    <p class="card-header-title">
      {job.jobType}&nbsp;<JobStatusTag status={job.status} />
    </p>
  </header>
</div>
