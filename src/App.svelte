<script>
  import { RouterView, Link } from './router'
  import { fetchAliases } from './api'
  import Icon from './components/Icon.svelte'

  // initial load
  fetchAliases()
</script>

<header>
  <div class="container">
    <Link to="home" class="logo">
      <img src="icon/iconx48.png" alt="z-alias">
    </Link>

    <button on:click={fetchAliases} class="btn">
      <Icon name="reload" />
    </button>
  </div>
</header>

<main>
  <div class="container">
    <RouterView />
  </div>
</main>

<footer>
  <div class="container">
    <Link to="create" class="btn">Create</Link>
    <Link to="about" class="btn btn-link">About</Link>
  </div>
</footer>

<style lang="scss">
  header,
  footer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4rem;
    background-color: var(--black-transparent);
    backdrop-filter: blur(10px);

    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }
  }

  header :global(.logo) {
    border: none;
    background: none;
  }

  footer {
    top: auto;
    bottom: 0;
  }


  main {
    padding: 4rem 0;
  }
</style>
