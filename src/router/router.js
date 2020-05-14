import { writable } from 'svelte/store'
import Home from '../views/Home.svelte'
import Edit from '../views/Edit.svelte'
import About from '../views/About.svelte'

const router = writable({
  current: 'home',
  routes: {
    'home': { component: Home },
    'create': { component: Edit, mode: 'create' },
    'edit': { component: Edit, mode: 'edit' },
    'about': { component: About }
  }
})

export default router
