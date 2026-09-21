import { addDays, daysBetween, parseISO, todayISO } from './dates';

export const PHASES = {
  menstrual: {
    label: 'Menstrual',
    emoji: '🌹',
    copy: 'Rest, hydrate, and be extra kind to yourself.',
    tone: 'bg-rose-100 text-rose-700',
  },
  follicular: {
    label: 'Follicular',
    emoji: '🌱',
    copy: 'Energy often rises — a great time for new ideas.',
    tone: 'bg-emerald-100 text-emerald-700',
  },
  ovulation: {
    label: 'Ovulation',
    emoji: '✨',
    copy: 'Peak energy and glow. Social plans feel easier.',
    tone: 'bg-amber-100 text-amber-800',
  },
  luteal: {
    label: 'Luteal',
    emoji: '🌙',
    copy: 'Slow down, protect your peace, and snack mindfully.',
    tone: 'bg-violet-100 text-violet-700',
  },
  unknown: {
    label: 'Getting to know you',
    emoji: '💫',
    copy: 'Log a few cycles and we will map your rhythm.',
    tone: 'bg-blossom-100 text-blossom-700',
  },
};

export function getPeriodStarts(periodDays) {
  const sorted = [...new Set(periodDays)].sort();
  const starts = [];
  sorted.forEach((iso, index) => {
    if (index === 0 || daysBetween(sorted[index - 1], iso) > 1) {
      starts.push(iso);
    }
  });
  return starts;
}

export function getPeriodRanges(periodDays) {
  const sorted = [...new Set(periodDays)].sort();
  const ranges = [];
  sorted.forEach((iso) => {
    const last = ranges[ranges.length - 1];
    if (!last || daysBetween(last.end, iso) > 1) {
      ranges.push({ start: iso, end: iso });
    } else {
      last.end = iso;
    }
  });
  return ranges;
}

export function averageCycleLength(periodDays, fallback = 28) {
  const starts = getPeriodStarts(periodDays);
  const lengths = [];
  for (let i = 1; i < starts.length; i += 1) {
    const length = daysBetween(starts[i - 1], starts[i]);
    if (length >= 18 && length <= 45) lengths.push(length);
  }
  if (!lengths.length) return fallback;
  return Math.round(lengths.reduce((sum, n) => sum + n, 0) / lengths.length);
}

export function averagePeriodLength(periodDays, fallback = 5) {
  const ranges = getPeriodRanges(periodDays);
  if (!ranges.length) return fallback;
  const lengths = ranges.map((range) => daysBetween(range.start, range.end) + 1);
  return Math.round(lengths.reduce((sum, n) => sum + n, 0) / lengths.length);
}

export function predictNextPeriod(periodDays, settings = {}) {
  const forecast = fertilityForecast(periodDays, settings);
  return forecast?.nextPeriod || null;
}

export function daysUntilNext(periodDays, settings = {}) {
  const next = predictNextPeriod(periodDays, settings);
  if (!next) return null;
  return daysBetween(todayISO(), next);
}

export function getCycleDay(iso, periodDays) {
  const starts = getPeriodStarts(periodDays);
  const prior = starts.filter((start) => start <= iso);
  if (!prior.length) return null;
  return daysBetween(prior[prior.length - 1], iso) + 1;
}

export function getPhase(iso, periodDays, settings = {}) {
  if (periodDays.includes(iso)) return 'menstrual';
  const cycleDay = getCycleDay(iso, periodDays);
  if (!cycleDay) return 'unknown';
  const avg = averageCycleLength(periodDays, settings.cycleLength || 28);
  const ovulationDay = Math.max(avg - 14, 8);
  if (cycleDay <= (settings.periodLength || 5)) return 'menstrual';
  if (cycleDay < ovulationDay - 1) return 'follicular';
  if (cycleDay <= ovulationDay + 1) return 'ovulation';
  if (cycleDay <= avg + 3) return 'luteal';
  return 'luteal';
}

export function fertilityForecast(periodDays, settings = {}) {
  const starts = getPeriodStarts(periodDays);
  const lastStart = starts[starts.length - 1];
  if (!lastStart) return null;

  const cycleLength = averageCycleLength(periodDays, settings.cycleLength || 28);
  const periodLength = averagePeriodLength(periodDays, settings.periodLength || 5);
  const today = todayISO();

  let cycleStart = lastStart;
  let nextPeriod = addDays(cycleStart, cycleLength);
  while (daysBetween(today, nextPeriod) < 0) {
    cycleStart = nextPeriod;
    nextPeriod = addDays(cycleStart, cycleLength);
  }

  const ovulation = addDays(nextPeriod, -14);
  const fertileStart = addDays(ovulation, -5);
  const fertileEnd = addDays(ovulation, 1);
  const peakStart = addDays(ovulation, -1);

  return {
    lastStart,
    cycleStart,
    nextPeriod,
    ovulation,
    fertileStart,
    fertileEnd,
    peakStart,
    peakEnd: ovulation,
    cycleLength,
    periodLength,
    daysUntilPeriod: daysBetween(today, nextPeriod),
    daysUntilOvulation: daysBetween(today, ovulation),
  };
}

export function predictedPeriodDays(periodDays, settings = {}, lookAhead = 90) {
  const forecast = fertilityForecast(periodDays, settings);
  if (!forecast) return [];
  const days = [];
  for (let cycle = 0; cycle < 3; cycle += 1) {
    const start = addDays(forecast.nextPeriod, cycle * forecast.cycleLength);
    for (let i = 0; i < forecast.periodLength; i += 1) {
      const iso = addDays(start, i);
      if (daysBetween(todayISO(), iso) <= lookAhead) days.push(iso);
    }
  }
  return days;
}

export function fertileDays(periodDays, settings = {}, lookAhead = 90) {
  const forecast = fertilityForecast(periodDays, settings);
  if (!forecast) return { window: [], peak: [], ovulation: [] };
  const window = [];
  const peak = [];
  const ovulation = [];
  for (let cycle = 0; cycle < 3; cycle += 1) {
    const shift = cycle * forecast.cycleLength;
    const ovu = addDays(forecast.ovulation, shift);
    const start = addDays(forecast.fertileStart, shift);
    const end = addDays(forecast.fertileEnd, shift);
    let cursor = start;
    while (cursor <= end) {
      if (daysBetween(todayISO(), cursor) <= lookAhead) window.push(cursor);
      cursor = addDays(cursor, 1);
    }
    const peakA = addDays(forecast.peakStart, shift);
    const peakB = addDays(forecast.peakEnd, shift);
    if (daysBetween(todayISO(), peakA) <= lookAhead) peak.push(peakA);
    if (daysBetween(todayISO(), peakB) <= lookAhead) peak.push(peakB);
    if (daysBetween(todayISO(), ovu) <= lookAhead) ovulation.push(ovu);
  }
  return { window, peak, ovulation };
}

export function cycleStats(periodDays, settings = {}) {
  const starts = getPeriodStarts(periodDays);
  const lengths = [];
  for (let i = 1; i < starts.length; i += 1) {
    lengths.push(daysBetween(starts[i - 1], starts[i]));
  }
  const valid = lengths.filter((n) => n >= 18 && n <= 45);
  const forecast = fertilityForecast(periodDays, settings);
  return {
    loggedCycles: Math.max(starts.length - 1, 0),
    averageLength: forecast?.cycleLength || settings.cycleLength || 28,
    periodLength: forecast?.periodLength || settings.periodLength || 5,
    shortest: valid.length ? Math.min(...valid) : null,
    longest: valid.length ? Math.max(...valid) : null,
    lastStart: starts[starts.length - 1] || null,
    nextStart: forecast?.nextPeriod || null,
    ovulation: forecast?.ovulation || null,
    fertileStart: forecast?.fertileStart || null,
    fertileEnd: forecast?.fertileEnd || null,
    regularity: valid.length < 2 ? 'Learning' : Math.max(...valid) - Math.min(...valid) <= 4 ? 'Steady' : 'Variable',
  };
}

export function fillRange(startIso, endIso) {
  const start = parseISO(startIso) <= parseISO(endIso) ? startIso : endIso;
  const end = parseISO(startIso) <= parseISO(endIso) ? endIso : startIso;
  const days = [];
  let cursor = start;
  while (cursor <= end) {
    days.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return days;
}
