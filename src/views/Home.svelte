<script>
  import { Link } from '../router'
  import { aliases } from '../api'
  import AliasItem from '../components/AliasItem.svelte'
</script>

{#each $aliases as alias}
  <AliasItem {alias} />
{:else}
  <h1>No Aliases Found</h1>
  <Link>Create</Link>
{/each}
