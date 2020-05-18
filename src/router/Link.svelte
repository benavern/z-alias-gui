<script>
  import router, { goto } from './router'
  const { shell } = window.require('electron')

  export let to = ''

  $: external = to.startsWith('http')

  function onClick () {
    if (external) {
      shell.openExternal(to)
    } else {
      goto(to)
    }
  }

</script>

<button on:click={onClick} { ...$$restProps } class:active={ $router.current === to }>
  <slot></slot>
</button>
