import { writable, get } from 'svelte/store'
const { clipboard } = require('electron')
const remote = require('@electron/remote')
const { aliasFile: filePath, parseAliasFile, removeFromFile, addToFile, replaceInFile } = window.require('z-alias/lib/utils/aliases')
const { aliasCmdGuard, aliasNameGuard } = window.require('z-alias/lib/commands/guards')

/**
 * @typedef {{ aliasName: string, aliasDesc: string, aliasCmd: string }} Alias - an alias object from z-alias lib
 *
 * @typedef {{ success: boolean, errors: { name: string|null, cmd: string|null } }} AliasValidation - the validation object for an alias
 */

// the path to the file where the aliases are stored
// @type string
export const aliasFile = filePath

// the renderer store aliases list
export const aliases = writable([])

/**
 * get errors for aliasName
 *
 * @param {string} aliasName - the alias name to valisate
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
 * @param {string} aliasCmd - the alias command to valisate
 *
 * @returns {string|null}
 */
export function aliasCmdError(aliasCmd) {
  const check = aliasCmdGuard(aliasCmd)

  if (check === true) return null
  return check
}

/**
 * Validate an alias and get the errors
 *
 * @param {Alias} alias - the alias to be validated
 *
 * @returns {AliasValidation} - the validation result with potential errors
 */
export function validateAlias(alias) {
  const nameErr = aliasNameError(alias.aliasName)
  const cmdErr = aliasCmdError(alias.aliasCmd)

  return {
    success: !nameErr && !cmdErr,
    errors: {
      name: nameErr,
      cmd: cmdErr
    }
  }
}

/**
 * Get the list of stored aliases
 *
 * @param {Boolean} [notify=false] - whether to display a notification on success
 *
 * @returns {Promise<Alias[]>} - The array of aliases
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
 * @param {Alias} alias - the alias to added
 *
 * @returns {Promise<AliasValidation>}
 */
export async function createAlias(alias) {
  const res = validateAlias(alias)

  // if there are errors stop execution and provide info
  if (!res.success) return res

  // add the alias
  await addToFile(alias)

  // tell the user it's done
  new Notification('z-alias', {
    body: 'The alias has been added.',
    icon: 'icon/iconx48.png'
  })

  // refresh aliases list
  await fetchAliases()

  return res
}

/**
 * Replaces an alias in the file
 *
 * @param {Alias} alias - the alias to be replaced
 *
 * @returns {Promise<AliasValidation>}
 */
export async function replaceAlias(alias) {
  const res = validateAlias(alias)

  // if there are errors stop execution and provide info
  if (!res.success) return res

  // replace the alias
  await replaceInFile(alias)

  // tell the user it's done
  new Notification('z-alias', {
    body: 'The alias has been editted.',
    icon: 'icon/iconx48.png'
  })

  // refresh aliases list
  await fetchAliases()

  return res
}

/**
 *  Delete an alias from the file
 *
 * @param {Alias} alias - the alias to be deleted
 *
 * @returns {Promise<void>}
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
 *
 * @returns {void}
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
