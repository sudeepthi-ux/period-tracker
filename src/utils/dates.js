export function toISO(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseISO(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function daysBetween(startIso, endIso) {
  const start = parseISO(startIso);
  const end = parseISO(endIso);
  return Math.round((end - start) / 86400000);
}

export function addDays(iso, amount) {
  const date = parseISO(iso);
  date.setDate(date.getDate() + amount);
  return toISO(date);
}

export function formatLong(iso) {
  return parseISO(iso).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export function formatShort(iso) {
  return parseISO(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

export function monthMatrix(year, month) {
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];

  for (let i = 0; i < startWeekday; i += 1) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(toISO(new Date(year, month, day)));
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }
  return cells;
}

export function todayISO() {
  return toISO(new Date());
}
