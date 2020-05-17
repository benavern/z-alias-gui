<script>
  import { Link } from '../router'
  import { aliases } from '../api'
  import AliasItem from '../components/AliasItem.svelte'
</script>

{#each $aliases as alias}
  <AliasItem {alias} />
{:else}
  <h1>No Alias Found</h1>
  <Link to="create" class="btn btn-outline">Create</Link>
{/each}
