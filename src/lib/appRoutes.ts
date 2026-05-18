export const APP_SHELL_PATHS = [
  '/tasks',
  '/project',
  '/templates',
  '/analytics',
  '/settings',
] as const;

export type AppShellPath = (typeof APP_SHELL_PATHS)[number];

export function isAppShellPath(pathname: string): boolean {
  return APP_SHELL_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export function isAuthPath(pathname: string): boolean {
  return pathname === '/auth' || pathname.startsWith('/auth/');
}
