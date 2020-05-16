<script>
  import { router, RouterView, Link } from './router'
  import { fetchAliases } from './api'

  let currentRoute

  router.subscribe(({current}) => {
    currentRoute = current
  })

  fetchAliases()
</script>

{#if currentRoute !== 'home'}
  <nav>
    <Link to="home">&larr; Home</Link>
  </nav>
{/if}

<main class:has-header={currentRoute !== 'home'}>
  <div class="container">
    <RouterView />
  </div>
</main>

<footer>
  <div class="container">
    <Link to="create">Create</Link>
    <Link to="about">About</Link>
    <Link to="error">Error</Link>
    <button on:click={fetchAliases}>Reload</button>
  </div>
</footer>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem;
    background-color: var(--black-transparent);
  }

  .has-header {
    padding-top: 4rem;
  }
</style>
