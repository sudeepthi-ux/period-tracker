import { useMemo, useState } from 'react';

const ICONS = ['🌸', '🍓', '🌙', '☕', '💌', '🧸', '🫧', '🎀'];

function shuffle(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

function deal() {
  return shuffle([...ICONS, ...ICONS]).map((icon, index) => ({
    id: index,
    icon,
    flipped: false,
    matched: false,
  }));
}

export default function MoodBooster() {
  const [cards, setCards] = useState(deal);
  const [picked, setPicked] = useState([]);
  const [moves, setMoves] = useState(0);
  const won = useMemo(() => cards.every((card) => card.matched), [cards]);

  const flip = (id) => {
    const card = cards.find((item) => item.id === id);
    if (!card || card.flipped || card.matched || picked.length === 2) return;

    const next = cards.map((item) => (item.id === id ? { ...item, flipped: true } : item));
    const nextPicked = [...picked, id];
    setCards(next);
    setPicked(nextPicked);

    if (nextPicked.length === 2) {
      setMoves((value) => value + 1);
      const [a, b] = nextPicked.map((cardId) => next.find((item) => item.id === cardId));
      setTimeout(() => {
        setCards((current) =>
          current.map((item) => {
            if (item.id === a.id || item.id === b.id) {
              if (a.icon === b.icon) return { ...item, matched: true };
              return { ...item, flipped: false };
            }
            return item;
          })
        );
        setPicked([]);
      }, 650);
    }
  };

  const reset = () => {
    setCards(deal());
    setPicked([]);
    setMoves(0);
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl text-blossom-800">Mood booster</h2>
          <p className="text-sm text-blossom-600">Match the cozy pairs. No timer, no pressure.</p>
        </div>
        <p className="text-sm font-bold text-blossom-600">{moves} moves</p>
      </div>
      <div className="mt-5 grid grid-cols-4 gap-2 sm:gap-3">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => flip(card.id)}
            className={`aspect-square rounded-2xl text-3xl shadow-sm transition ${
              card.flipped || card.matched ? 'bg-white' : 'bg-blossom-600 text-transparent'
            }`}
          >
            {card.flipped || card.matched ? card.icon : '✦'}
          </button>
        ))}
      </div>
      {won && (
        <div className="mt-5 rounded-2xl bg-emerald-50 p-4 text-center font-semibold text-emerald-800">
          You matched them all. Cute brain, cute win.
        </div>
      )}
      <button type="button" className="btn-ghost mt-4" onClick={reset}>
        New round
      </button>
    </div>
  );
}
