<script>
  import { goto } from './router'
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

<button on:click={onClick} { ...$$restProps }>
  <slot></slot>
</button>
