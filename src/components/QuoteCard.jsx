export default function QuoteCard({ quote, onRefresh }) {
  return (
    <section className="card bg-gradient-to-br from-blossom-600 to-blossom-800 text-white">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/70">Daily softness</p>
      <blockquote className="mt-3 font-display text-2xl leading-snug">“{quote}”</blockquote>
      <button
        type="button"
        onClick={onRefresh}
        className="mt-5 rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white ring-1 ring-white/30 transition hover:bg-white/25"
      >
        New quote
      </button>
    </section>
  );
}
