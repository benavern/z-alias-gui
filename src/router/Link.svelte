<script>
  import router from './router'

  export let to = ''

  function onClick() {
    router.update(store => ({
      ...store,
      current: to
    }))
  }
</script>

<button on:click={onClick} { ...$$restProps }>
  <slot></slot>
</button>
