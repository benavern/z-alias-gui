<script>
  import { afterUpdate } from 'svelte'
  import { createAlias, replaceAlias } from '../api'
  import { goto } from '../router/router.js'

  export let mode = 'create'
  export let alias

  let errors = {
    name: null,
    cmd: null
  }

  async function onSubmit() {
    let res
    if (mode === 'edit') {
      res = await replaceAlias(alias)
    } else {
      res = await createAlias(alias)
    }

    if (res.success) {
      goto('home')
      return
    }

    setErrors(res.errors)
  }

  function setErrors({ name = null, cmd = null } = {}){
    errors = { name, cmd };
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
        <div class="form-item">
          <label for="name">name</label>

          <input
            type="text"
            placeholder="ls"
            id="name"
            bind:value={alias.aliasName}
            class:error={errors.name}
            on:input={setErrors({...errors, name: null})}
            readonly={mode === 'edit'}
            required>

          {#if errors.name}
            <p class="error-msg">{errors.name}</p>
          {/if}
        </div>

        <div class="form-item">
          <label for="cmd">command</label>

          <input
            type="text"
            placeholder="ls -lAh"
            id="cmd"
            bind:value={alias.aliasCmd}
            on:input={setErrors({...errors, cmd: null})}
            required class:error={errors.cmd}>

          {#if errors.cmd}
            <p class="error-msg">{errors.cmd}</p>
          {/if}
        </div>

        <div class="form-item">
          <label for="desc">description</label>

          <input
            type="text"
            placeholder="Display directory content"
            id="desc"
            bind:value={alias.aliasDesc}>
        </div>

        <button class="btn submit" disabled={!alias.aliasName || !alias.aliasCmd}>{mode.toUpperCase()}</button>
      </div>
    </form>
  </div>
{/if}

<style lang="scss">
  .form-item {
    margin-bottom: 1rem;

    .error-msg {
      color: var(--danger);
      font-size: .75rem;
    }
  }
  label {
    display: block;
    font-variant: small-caps;
    color: var(--gray);
  }

  input {
    font-family: inherit;
    font-size: inherit;
    display: block;
    width: 100%;
    background-color: var(--light);
    border: 1px solid var(--gray);
    border-radius: .25rem;
    color: var(--dark);
    padding: .5rem 1rem;

    &[readonly] {
      color: var(--gray);
    }

    &.error {
      border-color: var(--danger);
      color: var(--danger);
    }
  }

  .submit {
    display: block;
    width: 100%;
  }
</style>
