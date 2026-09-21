import { useState } from 'react';
import { useTracker } from '../../context/TrackerContext';
import { formatShort } from '../../utils/dates';

export default function GratitudeJar() {
  const { gratitude, addGratitude } = useTracker();
  const [items, setItems] = useState(['', '', '']);
  const [saved, setSaved] = useState(false);

  const update = (index, value) => {
    setItems((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const submit = (event) => {
    event.preventDefault();
    if (items.some((item) => !item.trim())) return;
    addGratitude(items.map((item) => item.trim()));
    setItems(['', '', '']);
    setSaved(true);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <h2 className="font-display text-3xl text-blossom-800">Gratitude jar</h2>
        <p className="mt-2 text-sm text-blossom-600">Name three things, even tiny ones. They stay on this device.</p>
        <form onSubmit={submit} className="mt-5 space-y-3">
          {items.map((item, index) => (
            <input
              key={index}
              value={item}
              onChange={(event) => update(index, event.target.value)}
              placeholder={`${index + 1}. Today I am grateful for...`}
              className="w-full rounded-2xl bg-blossom-50 px-4 py-3 text-sm font-semibold text-blossom-800 ring-1 ring-blossom-100"
            />
          ))}
          <button type="submit" className="btn-primary w-full">
            Drop into the jar
          </button>
          {saved && <p className="text-center text-sm font-semibold text-emerald-700">Tucked away. That counts.</p>}
        </form>
      </div>
      <div className="rounded-[2.5rem] bg-gradient-to-b from-blossom-200 to-blossom-50 p-5">
        <div className="mx-auto h-8 w-24 rounded-full bg-blossom-700" />
        <div className="mx-auto -mt-1 min-h-[280px] max-w-xs rounded-b-[3rem] rounded-t-3xl bg-white/70 p-4 ring-4 ring-blossom-200">
          {gratitude.length ? (
            gratitude.slice(0, 8).map((entry) => (
              <article key={entry.id} className="mb-3 rounded-2xl bg-white p-3 text-sm shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-widest text-blossom-400">{formatShort(entry.date)}</p>
                <ul className="mt-1 list-disc pl-4 text-blossom-800">
                  {entry.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))
          ) : (
            <p className="pt-16 text-center text-sm text-blossom-500">Your jar is waiting. Three notes will bloom here.</p>
          )}
        </div>
      </div>
    </div>
  );
}
