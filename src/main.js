import App from './App.svelte'
import { setTheme } from './theme'
import './styles/global.scss'

const app = new App({
  target: document.body
})

setTheme()

export default app
