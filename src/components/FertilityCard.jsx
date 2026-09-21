import { fertilityForecast } from '../utils/cycle';
import { formatLong, formatShort, todayISO } from '../utils/dates';

export default function FertilityCard({ periodDays, settings }) {
  const forecast = fertilityForecast(periodDays, settings);
  if (!forecast) {
    return (
      <section className="card">
        <h3 className="font-display text-2xl text-blossom-800">Fertility window</h3>
        <p className="mt-2 text-sm text-blossom-600">Log when your last period started to see ovulation and fertile days.</p>
      </section>
    );
  }

  const today = todayISO();
  const inWindow = today >= forecast.fertileStart && today <= forecast.fertileEnd;
  const peak = today >= forecast.peakStart && today <= forecast.peakEnd;

  const ovuLabel =
    forecast.daysUntilOvulation === 0
      ? 'Today'
      : forecast.daysUntilOvulation > 0
        ? `in ${forecast.daysUntilOvulation} days`
        : `${Math.abs(forecast.daysUntilOvulation)} days ago`;

  const periodLabel =
    forecast.daysUntilPeriod === 0
      ? 'Today'
      : forecast.daysUntilPeriod > 0
        ? `in ${forecast.daysUntilPeriod} days`
        : 'Any day now';

  return (
    <section className="card lg:col-span-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl text-blossom-800">Your cycle forecast</h3>
          <p className="text-sm text-blossom-600">
            Based on a {forecast.cycleLength}-day cycle. These are estimates, not a pregnancy test or birth control.
          </p>
        </div>
        {peak ? (
          <span className="chip bg-amber-100 text-amber-800">Peak chance today</span>
        ) : inWindow ? (
          <span className="chip bg-emerald-100 text-emerald-800">Fertile window</span>
        ) : null}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Insight
          emoji="📅"
          label="Next period"
          value={formatLong(forecast.nextPeriod)}
          hint={periodLabel}
          tone="from-blossom-50 to-blossom-100"
        />
        <Insight
          emoji="✨"
          label="Ovulation"
          value={formatLong(forecast.ovulation)}
          hint={ovuLabel}
          tone="from-amber-50 to-amber-100"
        />
        <Insight
          emoji="🌱"
          label="Higher chance to conceive"
          value={`${formatShort(forecast.peakStart)} – ${formatShort(forecast.peakEnd)}`}
          hint={`${formatShort(forecast.fertileStart)} to ${formatShort(forecast.fertileEnd)} fertile window`}
          tone="from-emerald-50 to-emerald-100"
        />
      </div>
    </section>
  );
}

function Insight({ emoji, label, value, hint, tone }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br p-4 ring-1 ring-black/5 ${tone}`}>
      <p className="text-[11px] font-bold uppercase tracking-widest text-blossom-500">
        {emoji} {label}
      </p>
      <p className="mt-2 font-display text-xl leading-snug text-blossom-900">{value}</p>
      <p className="mt-1 text-sm font-semibold text-blossom-700/80">{hint}</p>
    </div>
  );
}
