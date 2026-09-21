import { formatShort } from '../utils/dates';

export default function CycleStats({ stats }) {
  const items = [
    { label: 'Logged cycles', value: stats.loggedCycles },
    { label: 'Average length', value: `${stats.averageLength}d` },
    { label: 'Shortest', value: stats.shortest ? `${stats.shortest}d` : '—' },
    { label: 'Longest', value: stats.longest ? `${stats.longest}d` : '—' },
    { label: 'Last start', value: stats.lastStart ? formatShort(stats.lastStart) : '—' },
    { label: 'Predicted next', value: stats.nextStart ? formatShort(stats.nextStart) : '—' },
    { label: 'Ovulation', value: stats.ovulation ? formatShort(stats.ovulation) : '—' },
    {
      label: 'Fertile window',
      value: stats.fertileStart ? `${formatShort(stats.fertileStart)} – ${formatShort(stats.fertileEnd)}` : '—',
    },
  ];

  return (
    <section className="card">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl text-blossom-800">Cycle statistics</h3>
          <p className="text-sm text-blossom-600">Built from the dates you mark. Nothing leaves this device.</p>
        </div>
        <span className="chip bg-dusk-100 text-dusk-600">{stats.regularity}</span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-2xl bg-blossom-50/80 p-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-blossom-500">{item.label}</p>
            <p className="mt-1 text-lg font-extrabold text-blossom-800">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
