<script>
  import { Link } from '../router'
  import Icon from './Icon.svelte'
  import { deleteAlias, copyAlias } from '../api'

  export let alias

  async function onDelete() {
    if (!alias) return
    await deleteAlias(alias)
  }

  function onCopy() {
    if (!alias) return
    copyAlias(alias)
  }

</script>

<div class="alias card">
  <div class="alias__info card__section">
    <div class="alias__info__main">
      <h3 class="name">{alias.aliasName}</h3>

      {#if alias.aliasName}
        <p class="desc">{alias.aliasDesc}</p>
      {/if}
    </div>

    <div class="alias__info__actions">
      <button on:click={onCopy} class="btn btn-icon">
        <Icon name="copy"/>
      </button>

      <Link to="edit" class="btn btn-icon">
        <Icon name="edit"/>
      </Link>

      <button on:click={onDelete} class="btn btn-icon">
        <Icon name="delete"/>
      </button>
    </div>
  </div>

  <pre class="alias__cmd"><code>{alias.aliasCmd}</code></pre>
</div>

<style lang="scss">
  .alias {
    &__info {
      display: flex;
      flex-direction: row;

      &__main {
        flex: 1;

        .desc {
          color: var(--gray);
        }
      }

      &__actions {
        display: flex;
        flex-direction: row;
        width: 8rem;
        font-size: 1rem;
      }
    }

    &__cmd {
      &:before{
        content: '$';
        color: var(--primary);
        user-select: none;
        margin-right: .5em;
      }
    }
  }
</style>
