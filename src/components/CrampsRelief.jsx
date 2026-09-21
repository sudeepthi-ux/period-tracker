const TIPS = [
  {
    title: 'Heating pad therapy',
    detail: 'Warmth on your lower belly or back for 15–20 minutes can ease muscle tension.',
    emoji: '🔥',
  },
  {
    title: 'Stretching exercises',
    detail: 'Child’s pose, cat-cow, and a gentle hip opener can reduce cramp intensity.',
    emoji: '🧘',
  },
  {
    title: 'Hydration reminder',
    detail: 'Sip water steadily. Herbal tea or a warm bottle nearby also helps.',
    emoji: '💧',
  },
  {
    title: 'Breathing exercises',
    detail: 'Inhale for 4, hold for 4, exhale for 6. Repeat until the wave softens.',
    emoji: '🌬️',
  },
];

export default function CrampsRelief({ intensity, onOpenGames }) {
  const high = intensity > 6;

  return (
    <section className="card h-full">
      <h3 className="font-display text-2xl text-blossom-800">Cramps care</h3>
      {high ? (
        <>
          <p className="mt-2 text-sm text-blossom-700">
            You logged cramps at <strong>{intensity}/10</strong>. Here are gentle next steps — not medical advice,
            just comfort ideas.
          </p>
          <ul className="mt-4 space-y-3">
            {TIPS.map((tip) => (
              <li key={tip.title} className="rounded-2xl bg-blossom-50 p-3">
                <p className="font-bold text-blossom-800">
                  {tip.emoji} {tip.title}
                </p>
                <p className="text-sm text-blossom-700/80">{tip.detail}</p>
              </li>
            ))}
          </ul>
          {onOpenGames ? (
            <button type="button" className="btn-primary mt-4 w-full" onClick={onOpenGames}>
              Open breathing & stretches
            </button>
          ) : null}
        </>
      ) : (
        <p className="mt-3 text-sm leading-relaxed text-blossom-700/80">
          If cramps climb above 6/10, this card will light up with heating, stretch, hydration, and breath ideas.
          Log symptoms anytime on the Body tab.
        </p>
      )}
    </section>
  );
}
