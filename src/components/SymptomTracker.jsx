import CrampsRelief from './CrampsRelief';
import { useTracker } from '../context/TrackerContext';
import { todayISO } from '../utils/dates';

const SYMPTOM_FLAGS = [
  { key: 'headache', label: 'Headache', emoji: '🤕' },
  { key: 'bloating', label: 'Bloating', emoji: '🫧' },
  { key: 'fatigue', label: 'Fatigue', emoji: '😴' },
];

export default function SymptomTracker() {
  const { symptoms, setSymptoms } = useTracker();
  const today = todayISO();
  const log = symptoms[today] || { cramps: 0, headache: false, bloating: false, fatigue: false, notes: '' };

  const update = (payload) => setSymptoms(today, payload);

  return (
    <div className="grid gap-5 lg:grid-cols-5">
      <section className="card lg:col-span-3">
        <h2 className="font-display text-2xl text-blossom-800">Body check-in</h2>
        <p className="mt-1 text-sm text-blossom-600">Track cramps, common symptoms, and a note for today.</p>

        <label className="mt-6 block">
          <div className="flex items-center justify-between text-sm font-bold text-blossom-700">
            <span>Cramps intensity</span>
            <span>{log.cramps || 0}/10</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={log.cramps || 0}
            onChange={(event) => update({ cramps: Number(event.target.value) })}
            className="mt-3 w-full accent-blossom-600"
          />
          <div className="mt-1 flex justify-between text-[11px] font-semibold text-blossom-400">
            <span>None</span>
            <span>Fierce</span>
          </div>
        </label>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {SYMPTOM_FLAGS.map((item) => {
            const active = Boolean(log[item.key]);
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => update({ [item.key]: !active })}
                className={`rounded-2xl px-3 py-4 text-center text-sm font-bold ${
                  active ? 'bg-blossom-600 text-white' : 'bg-blossom-50 text-blossom-800'
                }`}
              >
                <div className="text-xl">{item.emoji}</div>
                {item.label}
              </button>
            );
          })}
        </div>

        <label className="mt-6 block">
          <span className="text-sm font-bold text-blossom-700">Daily notes</span>
          <textarea
            value={log.notes || ''}
            onChange={(event) => update({ notes: event.target.value })}
            rows={4}
            placeholder="Sleep, food, energy, anything you want to remember..."
            className="mt-2 w-full rounded-2xl border-0 bg-blossom-50 p-4 text-sm text-blossom-800 ring-1 ring-blossom-100 placeholder:text-blossom-400"
          />
        </label>
      </section>

      <div className="lg:col-span-2">
        <CrampsRelief intensity={log.cramps || 0} />
      </div>
    </div>
  );
}
