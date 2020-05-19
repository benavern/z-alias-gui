<script>
  import router, { goto } from './router'
  const { shell } = window.require('electron')

  export let to = ''
  export let meta = null

  $: external = to.startsWith('http')

  function onClick () {
    if (external) {
      shell.openExternal(to)
    } else {
      goto(to, meta)
    }
  }

</script>

<button on:click={onClick} { ...$$restProps } class:active={ $router.current === to }>
  <slot></slot>
</button>
