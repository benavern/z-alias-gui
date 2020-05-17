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

<div class="alias">
  <div class="alias__info">
    <div class="alias__info__main">
      <h3 class="name">{alias.aliasName}</h3>

      {#if alias.aliasName}
        <p class="desc">{alias.aliasDesc}</p>
      {/if}
    </div>

    <div class="alias__info__actions">
      <button on:click={onCopy}>
        <Icon name="copy"/>
      </button>

      <Link to="edit">
        <Icon name="edit"/>
      </Link>

      <button on:click={onDelete}>
        <Icon name="delete"/>
      </button>
    </div>
  </div>

  <pre class="alias__cmd"><code>{alias.aliasCmd}</code></pre>
</div>

<style lang="scss">
  .alias {
    margin: 1rem 0;
    border-radius: .25rem;
    box-shadow: 0 0 .25rem var(--gray);
    background-color: var(--white);
    overflow: hidden;

    &__info {
      display: flex;
      flex-direction: row;
      padding: 1rem;

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

        > :global(*) {
          border: none;
          background-color: transparent;
          margin: auto;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          text-align: center;

          &:hover {
            cursor: pointer;
            background-color: var(--black-transparent);
          }
        }
      }
    }

    &__cmd {
      margin: 0;
      border-radius: 0;

      &:before{
        content: '$';
        color: var(--primary);
        user-select: none;
        margin-right: .5em;
      }
    }
  }
</style>
