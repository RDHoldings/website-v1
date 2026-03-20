import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * GitHub Pages and many hosts serve deep links with a trailing slash.
 * React Router paths are defined without it (e.g. `/precision-pilot-test`), so
 * normalize `/foo/` → `/foo` so the SPA route matches.
 */
export function TrailingSlashRedirect() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const { pathname, search, hash } = location
    if (pathname.length > 1 && pathname.endsWith('/')) {
      const nextPath = pathname.replace(/\/+$/, '') || '/'
      navigate(`${nextPath}${search}${hash}`, { replace: true })
    }
  }, [location, navigate])

  return null
}
