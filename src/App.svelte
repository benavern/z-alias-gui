<script>
  import { RouterView, Link } from './router'
  import { fetchAliases } from './api'
  import Icon from './components/Icon.svelte'
  const { remote } = window.require('electron')
  // initial load
  fetchAliases()

  function closeApp() {
    remote.app.quit()
  }
</script>

<header class="drag">
  <img src="icon/iconx48.png" alt="z-alias">

  {#if process.platform !== 'darwin'}
    <button class="close btn btn-icon no-drag" on:click={closeApp}>&times;</button>
  {/if}
</header>

<main>
  <div class="container">
    <RouterView />
  </div>
</main>

<footer>
  <div class="container">
    <Link to="home" class="btn">
      List
    </Link>

    <Link to="create" class="btn">
      Create
    </Link>

    <button on:click={fetchAliases} class="btn">
      <Icon name="reload" />
    </button>

    <Link to="about" class="btn btn-link">About</Link>
  </div>
</footer>

<style lang="scss">
  $header-height: 4rem;

  header,
  footer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $header-height;
    background-color: var(--black-transparent);
    backdrop-filter: blur(10px);

    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }
  }

  header {
    display: flex;
    align-items: center;
    justify-content: center;

    .close {
      position: absolute;
      top: 50%;
      right: 1rem;
      color: var(--white);
      transform: translateY(-50%);
    }
  }

  footer {
    top: auto;
    bottom: 0;
  }

  main {
    padding: $header-height 0;
  }
</style>
