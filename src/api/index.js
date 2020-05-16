import { writable } from 'svelte/store'
const { remote, clipboard } = window.require('electron')
const { aliasFile: filePath, parseAliasFile, removeFromFile } = window.require('z-alias/lib/utils/aliases')

export const aliasFile = filePath

export const aliases = writable([])

export async function fetchAliases() {
  const res = await parseAliasFile()
  aliases.set(res)
  return res
}

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

    // refresh aliases list
    await fetchAliases()
  }
}

export function copyAlias(alias) {
  clipboard.writeText(alias.aliasName)
}
