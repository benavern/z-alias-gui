<script>
  import { RouterView, Link } from './router'
  import { fetchAliases } from './api'
  import { toggleTheme } from './theme'
  import Icon from './components/Icon.svelte'
  const remote = require('@electron/remote')
  // initial load
  fetchAliases()

  function closeApp() {
    remote.app.quit()
  }
</script>

<header class="drag">
  <img src="icon/iconx48.png" alt="z-alias">

  <div class="actions">
    <button class="btn btn-icon no-drag" on:click={toggleTheme}>
      <Icon name="theme"/>
    </button>

    {#if process.platform !== 'darwin'}
      <button class="btn btn-icon no-drag" on:click={closeApp}>
        <Icon name="close" />
      </button>
    {/if}
  </div>
</header>

<main>
  <div class="container">
    <RouterView />
  </div>
</main>

<footer>
  <div class="container">
    <Link to="home" class="btn btn-icon">
      <Icon name="list" />
    </Link>

    <Link to="create" class="btn btn-icon">
      <Icon name="add" />
    </Link>

    <button on:click={fetchAliases} class="btn btn-icon">
      <Icon name="reload" />
    </button>

    <Link to="about" class="btn btn-icon">
      <Icon name="info" />
    </Link>
  </div>
</footer>

<style lang="scss">
  $header-height: 3rem;

  header,
  footer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $header-height;
    background-color: var(--black-transparent);
    backdrop-filter: blur(10px);
    color: $white;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: center;

    .actions {
      position: absolute;
      top: 50%;
      right: .25rem;
      transform: translateY(-50%);
    }
  }

  footer {
    top: auto;
    bottom: 0;

    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }

    :global(.active) {
      color: var(--primary);
    }
  }

  main {
    padding: $header-height 0;
  }
</style>
