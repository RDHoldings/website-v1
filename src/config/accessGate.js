export const SECRET_ROUTE_KEYS = {
  precisionPilot: 'precisionPilot',
  precisionPilotTest: 'precisionPilotTest',
  livingBible: 'livingBible',
  livingBibleTest: 'livingBibleTest',
}

export const SECRET_ROUTE_PATHS = {
  [SECRET_ROUTE_KEYS.precisionPilot]: '/precision-pilot',
  [SECRET_ROUTE_KEYS.precisionPilotTest]: '/precision-pilot-test',
  [SECRET_ROUTE_KEYS.livingBible]: '/living-bible',
  [SECRET_ROUTE_KEYS.livingBibleTest]: '/living-bible-test',
}

export const SECRET_ROUTES = Object.entries(SECRET_ROUTE_PATHS).map(([key, path]) => ({
  key,
  path,
}))

/**
 * @param {string} pathname
 * @returns {string | null}
 */
export function getSecretRouteKey(pathname) {
  const clean = (pathname || '/').split('?')[0]
  const hit = SECRET_ROUTES.find((entry) => entry.path === clean)
  return hit?.key ?? null
}
