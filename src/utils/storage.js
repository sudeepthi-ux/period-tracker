const KEY = 'flow-and-mood-v1';

export const defaultState = {
  user: null,
  settings: {
    cycleLength: 28,
    periodLength: 5,
  },
  onboarded: false,
  periodDays: [],
  moods: {},
  symptoms: {},
  gratitude: [],
};

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...defaultState };
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return { ...defaultState };
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}
