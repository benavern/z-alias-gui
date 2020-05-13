<script>
  import Home from "./routes/Home.svelte"
  import Edit from "./routes/Edit.svelte"
  import About from "./routes/About.svelte"

  let currentRoute = 'home'

  let routes = {
    'home': { component: Home },
    'create': { component: Edit, mode: 'create' },
    'edit': { component: Edit, mode: 'edit' },
    'about': { component: About }
  }

  function goto(route) {
    console.log('Nav to', route)
    currentRoute = route
  }
</script>

{#if currentRoute !== 'home'}
  <nav>
    <button on:click={() => goto('home')}>&larr; Home</button>
  </nav>
{/if}

<main class:has-header={currentRoute !== 'home'}>
  <div class="container">
    {#if routes[currentRoute]}
      <svelte:component this={routes[currentRoute].component} mode={routes[currentRoute].mode} on:goto={({ detail: path }) => goto(path)}/>
    {:else}
      <h1>You are lost.</h1>
      <button on:click={() => goto('home')}>Back to Home</button>
    {/if}
  </div>
</main>

<footer>
  <div class="container">
    <button on:click={() => goto('about')}>About</button>
    <button on:click={() => goto('error')}>ERROR</button>
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
