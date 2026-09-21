import { useMemo } from 'react';
import { useTracker } from '../context/TrackerContext';
import { PHASES, getPhase } from '../utils/cycle';
import { formatShort, todayISO } from '../utils/dates';

const SCALE = [
  { value: 1, emoji: '😢', label: 'Low' },
  { value: 2, emoji: '😕', label: 'Off' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 5, emoji: '😄', label: 'Bright' },
];

export default function MoodTracker() {
  const { moods, periodDays, setMood, settings } = useTracker();
  const today = todayISO();
  const phaseKey = getPhase(today, periodDays, settings);
  const phase = PHASES[phaseKey];
  const todayMood = moods[today]?.mood;

  const history = useMemo(
    () =>
      Object.entries(moods)
        .map(([date, value]) => ({
          date,
          mood: value.mood,
          phase: getPhase(date, periodDays, settings),
        }))
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .slice(0, 14),
    [moods, periodDays, settings]
  );

  const averages = useMemo(() => {
    const buckets = {};
    history.forEach((entry) => {
      buckets[entry.phase] = buckets[entry.phase] || [];
      buckets[entry.phase].push(entry.mood);
    });
    return Object.entries(buckets).map(([phaseId, values]) => ({
      phaseId,
      avg: (values.reduce((sum, n) => sum + n, 0) / values.length).toFixed(1),
    }));
  }, [history]);

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className="card">
        <h2 className="font-display text-2xl text-blossom-800">How are you feeling?</h2>
        <p className="mt-1 text-sm text-blossom-600">
          Logged against your {phase.label.toLowerCase()} phase {phase.emoji}
        </p>
        <div className="mt-5 grid grid-cols-5 gap-2">
          {SCALE.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setMood(today, item.value)}
              className={`rounded-2xl py-4 text-center transition ${
                todayMood === item.value
                  ? 'bg-blossom-600 text-white shadow-card'
                  : 'bg-blossom-50 text-blossom-800 hover:bg-white'
              }`}
            >
              <div className="text-2xl">{item.emoji}</div>
              <div className="mt-1 text-[11px] font-bold">{item.label}</div>
            </button>
          ))}
        </div>
        <p className="mt-4 rounded-2xl bg-blossom-50 p-3 text-sm text-blossom-700">{phase.copy}</p>
      </section>

      <section className="card">
        <h3 className="font-display text-2xl text-blossom-800">Mood trends</h3>
        <div className="mt-4 flex items-end gap-2">
          {history.slice(0, 10).reverse().map((entry) => (
            <div key={entry.date} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-full bg-gradient-to-t from-blossom-500 to-blossom-300"
                style={{ height: `${entry.mood * 18}px` }}
                title={`${entry.date}: ${entry.mood}/5`}
              />
              <span className="text-[10px] font-bold text-blossom-400">{entry.date.slice(8)}</span>
            </div>
          ))}
          {!history.length && <p className="text-sm text-blossom-600">Your last 10 moods will draw a tiny chart here.</p>}
        </div>
        <div className="mt-5 space-y-2">
          {averages.map((item) => (
            <div key={item.phaseId} className="flex items-center justify-between rounded-xl bg-blossom-50 px-3 py-2 text-sm">
              <span>
                {PHASES[item.phaseId]?.emoji} {PHASES[item.phaseId]?.label || item.phaseId}
              </span>
              <strong>{item.avg} / 5</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="card lg:col-span-2">
        <h3 className="font-display text-2xl text-blossom-800">Mood history</h3>
        <ul className="mt-4 divide-y divide-blossom-100">
          {history.length ? (
            history.map((entry) => (
              <li key={entry.date} className="flex items-center justify-between py-3 text-sm">
                <span className="font-semibold text-blossom-800">{formatShort(entry.date)}</span>
                <span>
                  {SCALE[entry.mood - 1].emoji} {SCALE[entry.mood - 1].label}
                </span>
                <span className={`chip ${PHASES[entry.phase].tone}`}>{PHASES[entry.phase].label}</span>
              </li>
            ))
          ) : (
            <li className="py-6 text-sm text-blossom-600">No mood logs yet. Tap a face to start your trendline.</li>
          )}
        </ul>
      </section>
    </div>
  );
}
