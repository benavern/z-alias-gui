<script>
  import { afterUpdate } from 'svelte'
  import { createAlias, replaceAlias } from '../api'
  import { goto } from '../router/router.js'

  export let mode = 'create'

  export let alias

  async function onSubmit() {
    let res
    if (mode === 'edit') {
      res = await replaceAlias(alias)
    } else {
      res = await createAlias(alias)
    }

    if (res.success) {
      goto('home')
    }
  }

  afterUpdate(() => {
    if (!alias) {
      alias = {
        aliasName: '',
        aliasCmd: '',
        aliasDesc: ''
      }
    }
	});
</script>

<h1>{mode} alias</h1>

{#if alias}
  <div class="card">
    <form on:submit|preventDefault={onSubmit}>
      <div class="card__section">
        <label for="name">name</label>
        <input type="text" placeholder="ls" id="name" bind:value={alias.aliasName} required readonly={mode === 'edit'}>

        <label for="cmd">command</label>
        <input type="text" placeholder="ls -lAh" id="cmd" bind:value={alias.aliasCmd} required>

        <label for="desc">description</label>
        <input type="text" placeholder="Display directory content" id="desc" bind:value={alias.aliasDesc}>

        <button class="btn submit" disabled={!alias.aliasName || !alias.aliasCmd}>{mode.toUpperCase()}</button>
      </div>
    </form>
  </div>
{/if}

<style lang="scss">
  label {
    display: block;
    font-variant: small-caps;
    color: var(--gray);
  }

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

    &[readonly] {
      color: var(--gray);
    }
  }

  .submit {
    display: block;
    width: 100%;
  }
</style>
