import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import App from './App'

const rootRoute = createRootRoute({
  component: Outlet,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
})

const callbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/callback',
  component: App,
})

const routeTree = rootRoute.addChildren([indexRoute, callbackRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
