import { writable, get } from 'svelte/store'

const currentTheme = localStorage.getItem('theme') || 'light'

export const theme = writable(currentTheme)

export function setTheme(newTheme = currentTheme) {
  theme.set(newTheme)
  localStorage.setItem('theme', newTheme)
  document.documentElement.classList.toggle('dark-theme', newTheme === 'dark')
}

export function toggleTheme() {
  if(get(theme) === 'light') {
    setTheme('dark')
    return
  }
  setTheme('light')
}
