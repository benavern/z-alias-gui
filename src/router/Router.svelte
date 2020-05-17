<script>
  import router from './router'
  import Link from './Link.svelte'

  let currentRoute = ''
  let routesList = []

  router.subscribe(({current, routes}) => {
    currentRoute = current
    routesList = routes
  })
</script>

{#if routesList[currentRoute]}
  <svelte:component this={routesList[currentRoute].component} mode={routesList[currentRoute].mode} />
{:else}
  <h1>You are lost.</h1>
  <Link to="home" class="btn btn-outline">Back to Home</Link>
{/if}
