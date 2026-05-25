const OAUTH_STATE_STORAGE_KEY = 'github_oauth_state';
const OAUTH_PROCESSED_CODE_KEY = 'github_oauth_processed_code';

export function saveOAuthState(state: string) {
  sessionStorage.setItem(OAUTH_STATE_STORAGE_KEY, state);
}

export function getOAuthState(): string | null {
  return sessionStorage.getItem(OAUTH_STATE_STORAGE_KEY);
}

export function clearOAuthState() {
  sessionStorage.removeItem(OAUTH_STATE_STORAGE_KEY);
}

export function isOAuthCodeProcessed(code: string) {
  return sessionStorage.getItem(OAUTH_PROCESSED_CODE_KEY) === code;
}

export function markOAuthCodeProcessed(code: string) {
  sessionStorage.setItem(OAUTH_PROCESSED_CODE_KEY, code);
}

export function clearOAuthCodeProcessed() {
  sessionStorage.removeItem(OAUTH_PROCESSED_CODE_KEY);
}

export function extractStateFromOAuthUrl(url: string): string | null {
  try {
    return new URL(url).searchParams.get('state');
  } catch {
    return null;
  }
}
