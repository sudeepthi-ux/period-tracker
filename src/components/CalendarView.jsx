import { useMemo, useState } from 'react';
import { useTracker } from '../context/TrackerContext';
import { monthMatrix, parseISO, todayISO } from '../utils/dates';
import { cycleStats, fertileDays, getPhase, predictedPeriodDays } from '../utils/cycle';
import CycleStats from './CycleStats';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarView() {
  const today = todayISO();
  const now = new Date();
  const [cursor, setCursor] = useState({ year: now.getFullYear(), month: now.getMonth() });
  const { periodDays, moods, rangeAnchor, togglePeriodDay, markPeriodRange, setRangeAnchor, settings } = useTracker();
  const [mode, setMode] = useState('range');

  const cells = useMemo(() => monthMatrix(cursor.year, cursor.month), [cursor]);
  const predicted = useMemo(() => new Set(predictedPeriodDays(periodDays, settings)), [periodDays, settings]);
  const fertility = useMemo(() => fertileDays(periodDays, settings), [periodDays, settings]);
  const fertileSet = useMemo(() => new Set(fertility.window), [fertility]);
  const ovulationSet = useMemo(() => new Set(fertility.ovulation), [fertility]);
  const stats = cycleStats(periodDays, settings);
  const title = new Date(cursor.year, cursor.month, 1).toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  });

  const handleDay = (iso) => {
    if (mode === 'toggle') togglePeriodDay(iso);
    else markPeriodRange(iso);
  };

  const shift = (delta) => {
    const date = new Date(cursor.year, cursor.month + delta, 1);
    setCursor({ year: date.getFullYear(), month: date.getMonth() });
  };

  return (
    <div className="grid gap-5 lg:grid-cols-5">
      <section className="card lg:col-span-3">
        <div className="flex items-center justify-between gap-3">
          <button type="button" className="btn-ghost" onClick={() => shift(-1)} aria-label="Previous month">
            ←
          </button>
          <h2 className="font-display text-2xl text-blossom-800">{title}</h2>
          <button type="button" className="btn-ghost" onClick={() => shift(1)} aria-label="Next month">
            →
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className={mode === 'range' ? 'btn-primary' : 'btn-ghost'}
            onClick={() => {
              setMode('range');
              setRangeAnchor(null);
            }}
          >
            Mark start → end
          </button>
          <button
            type="button"
            className={mode === 'toggle' ? 'btn-primary' : 'btn-ghost'}
            onClick={() => {
              setMode('toggle');
              setRangeAnchor(null);
            }}
          >
            Tap to toggle days
          </button>
        </div>
        <p className="mt-3 text-sm text-blossom-600">
          {mode === 'range'
            ? rangeAnchor
              ? `Start set to ${rangeAnchor}. Tap the end date to fill the range.`
              : 'Tap a start date, then an end date. Pink = period, gold = ovulation, green = fertile window.'
            : 'Tap any date to add or remove a period day.'}
        </p>

        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase tracking-wider text-blossom-400">
          {WEEKDAYS.map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((iso, index) => {
            if (!iso) return <div key={`empty-${index}`} />;
            const onPeriod = periodDays.includes(iso);
            const isToday = iso === today;
            const isPredicted = !onPeriod && predicted.has(iso);
            const isOvulation = ovulationSet.has(iso);
            const isFertile = !onPeriod && !isPredicted && fertileSet.has(iso);
            const mood = moods[iso]?.mood;
            const isAnchor = rangeAnchor === iso;
            return (
              <button
                key={iso}
                type="button"
                onClick={() => handleDay(iso)}
                className={`relative aspect-square rounded-2xl text-sm font-bold transition ${
                  onPeriod
                    ? 'bg-gradient-to-br from-blossom-400 to-blossom-600 text-white shadow-glow'
                    : isOvulation
                      ? 'bg-amber-400 text-amber-950'
                      : isPredicted
                        ? 'bg-white text-blossom-700 ring-2 ring-dashed ring-blossom-300'
                        : isFertile
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-white/70 text-blossom-800 hover:bg-white'
                } ${isToday ? 'ring-2 ring-dusk-400' : ''} ${isAnchor ? 'ring-2 ring-blossom-800' : ''}`}
              >
                {parseISO(iso).getDate()}
                {mood ? (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-[10px]">
                    {['😢', '😕', '😐', '🙂', '😄'][mood - 1]}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-blossom-600">
          <Legend swatch="bg-gradient-to-br from-blossom-400 to-blossom-600" label="Period day" />
          <Legend swatch="bg-white ring-2 ring-dashed ring-blossom-300" label="Predicted period" />
          <Legend swatch="bg-amber-400" label="Ovulation" />
          <Legend swatch="bg-emerald-100" label="Fertile / higher chance" />
          <Legend swatch="bg-white ring-2 ring-dusk-400" label="Today" />
        </div>
      </section>

      <div className="lg:col-span-2">
        <CycleStats stats={stats} />
        <p className="mt-4 text-sm text-blossom-600">
          Today’s phase: <strong>{getPhase(today, periodDays, settings)}</strong>. Green days are the estimated fertile
          window; gold is ovulation. This is not contraception.
        </p>
      </div>
    </div>
  );
}

function Legend({ swatch, label }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-4 w-4 rounded-md ${swatch}`} />
      {label}
    </span>
  );
}
