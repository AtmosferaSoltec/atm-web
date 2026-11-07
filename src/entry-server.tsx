import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { findRoute, routes } from './routes'

export { routes }

export function render(path: string) {
  const route = findRoute(path)
  const Page = route.component
  return renderToString(
    <StrictMode>
      <Page />
    </StrictMode>,
  )
}
