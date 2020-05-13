<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function goto(path) {
    dispatch('goto', path)
  }
</script>

<h1>Liste des alias</h1>

<button on:click={() => goto('create')}>Create</button>
<button on:click={() => goto('edit')}>Edit</button>


