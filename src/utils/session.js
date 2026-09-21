const SESSION_KEY = 'flow-and-mood-session';

export function hasSession() {
  return sessionStorage.getItem(SESSION_KEY) === '1';
}

export function startSession() {
  sessionStorage.setItem(SESSION_KEY, '1');
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
