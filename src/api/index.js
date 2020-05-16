import { writable } from 'svelte/store'
const { remote, clipboard } = window.require('electron')
const { aliasFile: filePath, parseAliasFile, removeFromFile } = window.require('z-alias/lib/utils/aliases')

/**
 * @typedef {{aliasName: string, aliasDesc: string, aliasCmd: string}} Alias - an alias object from z-alias lib
 */

// the path to the file where the aliases are stored
export const aliasFile = filePath

// the renderer store aliases list
export const aliases = writable([])

/**
 * Get the list of stored aliases
 *
 * @param {Boolean} notify - whether to display a notification on success
 * @default(notify): false
 *
 * @returns {alias[]} - The array of aliases
 */
export async function fetchAliases(notify = false) {
  // get the aliases list
  const res = await parseAliasFile()

  // put it in the renderer store context
  aliases.set(res)

  // notify if needed
  if (notify) {
    new Notification('z-alias', {
      body: 'The aliases list has been reloaded.',
      icon: 'icon/iconx48.png'
    })
  }

  return res
}

/**
 *  Delete an alias from the file
 *
 * @param {Alias} alias - the alias to be deleted
 */
export async function deleteAlias(alias) {
  // ask for confirmation
  const confirm = await remote.dialog.showMessageBox({
    title: 'Remove alias',
    message: 'Are you sure you want to remove this alias ?',
    type: 'warning',
    buttons: ["Cancel", "Delete"],
    detail: `If you press Delete, the alias "${alias.aliasName}" will no longer be available in your next shell sessions.`,
    cancelId: 0
  })

  if (!!confirm.response) {
    // delete the alias
    await removeFromFile([alias.aliasName])

    // tell the user it's done
    new Notification('z-alias', {
      body: 'The alias has been removed.',
      icon: 'icon/iconx48.png'
    })

    // refresh aliases list
    await fetchAliases()
  }
}

/**
 * Copy the alias name in clipboard
 *
 * @param {Alias} alias - the alias to be copied
 */
export function copyAlias(alias) {
  // write to the clipboard
  clipboard.writeText(alias.aliasName)

  // tell the user it's done
  new Notification('z-alias', {
    body: 'The alias has been copied to your clipboard.',
    icon: 'icon/iconx48.png'
  })
}
