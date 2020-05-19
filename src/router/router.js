import { writable } from 'svelte/store'
import Home from '../views/Home.svelte'
import Edit from '../views/Edit.svelte'
import About from '../views/About.svelte'

// the router store
const router = writable({
  current: 'home',
  routes: {
    'home': { component: Home },
    'create': { component: Edit, mode: 'create' },
    'edit': { component: Edit, mode: 'edit' },
    'about': { component: About }
  }
})

/**
 * Changes the current route
 *
 * @param {string} to - the name of the target route
 */
export function goto (to = '', meta) {
  router.update(({ routes }) => {
    if (routes[to]) {
      routes[to].meta = meta
    }

    return {
      current: to,
      routes
    }
  })
}

export default router
