<script>
  import { createAlias } from '../api'

  export let mode = 'edit'


  let alias = {
    aliasName: '',
    aliasCmd: '',
    aliasDesc: ''
  }

  async function onSubmit() {
    const res = await createAlias(alias)

    if (res.success) {
      alias = {
        aliasName: '',
        aliasCmd: '',
        aliasDesc: ''
      }
    }
  }
</script>

<h1>{mode} alias</h1>

<div class="card">
  <form on:submit|preventDefault={onSubmit}>
    <div class="card__section">
      <label for="name">Name</label>
      <input type="text" placeholder="ls" id="name" bind:value={alias.aliasName}>

      <label for="desc">Description</label>
      <input type="text" placeholder="ls -lAh" id="cmd" bind:value={alias.aliasCmd}>

      <label for="desc">Name</label>
      <input type="text" placeholder="Display directory content" id="desc" bind:value={alias.aliasDesc}>

      <p>
        <button class="btn" disabled={!alias.aliasName || !alias.aliasCmd}>Create</button>
      </p>
    </div>
  </form>
</div>

<style>
  input {
    font-family: inherit;
    font-size: inherit;
    display: block;
    margin-bottom: 1rem;
    width: 100%;
    background-color: var(--light);
    border: 1px solid var(--gray);
    border-radius: .25rem;
    color: dark;
    padding: .5rem 1rem;
  }
</style>
