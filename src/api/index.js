import { writable } from 'svelte/store'
// const { remote } = window.require('electron')
const { aliasFile: filePath, parseAliasFile } = window.require('z-alias/lib/utils/aliases')

export const aliases = writable([])

export const aliasFile = filePath

export async function getAliases() {
  return await parseAliasFile()
}
