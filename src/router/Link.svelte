<script>
  import { goto } from './router'

  export let to = ''
</script>

<button on:click={() => goto(to)} { ...$$restProps }>
  <slot></slot>
</button>
