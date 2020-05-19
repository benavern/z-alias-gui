import { writable, get } from 'svelte/store'
const { remote, clipboard } = window.require('electron')
const { aliasFile: filePath, parseAliasFile, removeFromFile, addToFile, replaceInFile } = window.require('z-alias/lib/utils/aliases')
const { aliasCmdGuard, aliasNameGuard } = window.require('z-alias/lib/commands/guards')

/**
 * @typedef {{aliasName: string, aliasDesc: string, aliasCmd: string}} Alias - an alias object from z-alias lib
 */

// the path to the file where the aliases are stored
export const aliasFile = filePath

// the renderer store aliases list
export const aliases = writable([])

/**
 * get errors for aliasName
 *
 * @param {string} aliasName - the alias to valisate
 *
 * @returns {string|null}
 */
export function aliasNameError(aliasName) {
  const check = aliasNameGuard(get(aliases))(aliasName)

  if (check === true) return null
  return check
}

/**
 * get errors for aliasCmd
 *
 * @param {string} aliasCmd - the alias to valisate
 *
 * @returns {string|null}
 */
export function aliasCmdError(aliasCmd) {
  const check = aliasCmdGuard(aliasCmd)

  if(check === true) return null
  return check
}

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
 * Add an alias to the file
 *
 * @param {Alias} alias - the new alias to add
 */
export async function createAlias(alias) {
  const nameError = aliasNameError(alias.aliasName)
  const cmdError = aliasCmdError(alias.aliasCmd)

  if (nameError) {
    new Notification('z-alias', {
      body: nameError,
      icon: 'icon/iconx48.png'
    })

    return { success: false }
  }

  if (cmdError) {
    new Notification('z-alias', {
      body: cmdError,
      icon: 'icon/iconx48.png'
    })

    return { success: false }
  }

  // add the alias
  await addToFile(alias)

  // tell the user it's done
  new Notification('z-alias', {
    body: 'The alias has been added.',
    icon: 'icon/iconx48.png'
  })

  // refresh aliases list
  await fetchAliases()

  return { success: true }
}

/**
 * Replaces an alias in the file
 *
 * @param {Alias} alias - the new alias to add
 */
export async function replaceAlias(alias) {
  const nameError = aliasNameError(alias.aliasName)
  const cmdError = aliasCmdError(alias.aliasCmd)

  if (nameError) {
    new Notification('z-alias', {
      body: nameError,
      icon: 'icon/iconx48.png'
    })

    return { success: false }
  }

  if (cmdError) {
    new Notification('z-alias', {
      body: cmdError,
      icon: 'icon/iconx48.png'
    })

    return { success: false }
  }

  // replace the alias
  await replaceInFile(alias)

  // tell the user it's done
  new Notification('z-alias', {
    body: 'The alias has been editted.',
    icon: 'icon/iconx48.png'
  })

  // refresh aliases list
  await fetchAliases()

  return { success: true }
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
