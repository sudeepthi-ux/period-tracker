import { useState } from 'react';
import { QUOTES, randomItem } from '../utils/quotes';
import { PHASES, cycleStats, daysUntilNext, getPhase } from '../utils/cycle';
import { formatLong, formatShort, todayISO } from '../utils/dates';
import { useTracker } from '../context/TrackerContext';
import QuoteCard from './QuoteCard';
import CycleStats from './CycleStats';
import CrampsRelief from './CrampsRelief';
import FertilityCard from './FertilityCard';

export default function Dashboard({ onOpen }) {
  const { periodDays, moods, symptoms, logTodayPeriod, settings, user } = useTracker();
  const today = todayISO();
  const phase = PHASES[getPhase(today, periodDays, settings)];
  const stats = cycleStats(periodDays, settings);
  const until = daysUntilNext(periodDays, settings);
  const todayMood = moods[today]?.mood;
  const cramps = symptoms[today]?.cramps || 0;
  const [quote, setQuote] = useState(() => randomItem(QUOTES));

  return (
    <div className="grid gap-5 lg:grid-cols-5">
      <section className="card lg:col-span-3">
        <p className="text-sm font-semibold text-blossom-500">{formatLong(today)}</p>
        <h2 className="mt-1 font-display text-3xl text-blossom-800">Hello, {user?.name || 'you'}.</h2>
        <div className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold ${phase.tone}`}>
          <span>{phase.emoji}</span> {phase.label} phase
        </div>
        <p className="mt-3 max-w-xl text-blossom-700/80">{phase.copy}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Stat
            label="Next period"
            value={until == null ? 'Log a cycle' : until <= 0 ? 'Any day now' : `${until} days`}
          />
          <Stat label="Ovulation" value={stats.ovulation ? formatShort(stats.ovulation) : '—'} />
          <Stat
            label="Peak chance"
            value={stats.fertileStart ? `${formatShort(stats.ovulation)}` : '—'}
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button type="button" className="btn-primary" onClick={logTodayPeriod}>
            Today is a period day
          </button>
          <button type="button" className="btn-ghost" onClick={() => onOpen('calendar')}>
            Open calendar
          </button>
          <button type="button" className="btn-ghost" onClick={() => onOpen('games')}>
            Need a mood lift?
          </button>
        </div>
      </section>

      <div className="grid gap-5 lg:col-span-2">
        <QuoteCard quote={quote} onRefresh={() => setQuote(randomItem(QUOTES, quote))} />
        <div className="card">
          <p className="text-xs font-bold uppercase tracking-widest text-blossom-500">Today at a glance</p>
          <p className="mt-2 text-sm text-blossom-700">
            Mood: {todayMood ? ['😢', '😕', '😐', '🙂', '😄'][todayMood - 1] : 'not logged yet'}
          </p>
          <p className="text-sm text-blossom-700">Cramps: {cramps ? `${cramps}/10` : 'not logged yet'}</p>
          <div className="mt-3 flex gap-2">
            <button type="button" className="btn-ghost" onClick={() => onOpen('mood')}>
              Log mood
            </button>
            <button type="button" className="btn-ghost" onClick={() => onOpen('symptoms')}>
              Log body
            </button>
          </div>
        </div>
      </div>

      <FertilityCard periodDays={periodDays} settings={settings} />

      <div className="lg:col-span-3">
        <CycleStats stats={stats} />
      </div>
      <div className="lg:col-span-2">
        <CrampsRelief intensity={cramps} onOpenGames={() => onOpen('games')} />
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl bg-blossom-50 px-4 py-3 ring-1 ring-blossom-100">
      <p className="text-[11px] font-bold uppercase tracking-widest text-blossom-500">{label}</p>
      <p className="mt-1 font-display text-xl text-blossom-800">{value}</p>
    </div>
  );
}
