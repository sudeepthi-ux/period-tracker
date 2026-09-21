import { useState } from 'react';
import { AFFIRMATIONS, randomItem } from '../../utils/quotes';

export default function AffirmationSpinner() {
  const [line, setLine] = useState(AFFIRMATIONS[0]);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    setSpinning(true);
    let ticks = 0;
    const timer = setInterval(() => {
      setLine(randomItem(AFFIRMATIONS));
      ticks += 1;
      if (ticks > 12) {
        clearInterval(timer);
        setLine(randomItem(AFFIRMATIONS, line));
        setSpinning(false);
      }
    }, 80);
  };

  return (
    <div className="text-center">
      <h2 className="font-display text-3xl text-blossom-800">Affirmation spinner</h2>
      <p className="mt-2 text-sm text-blossom-600">A sentence to carry. Spin until one lands in your chest.</p>
      <div className="relative mx-auto mt-8 grid h-48 w-48 place-items-center">
        <div className={`absolute inset-0 rounded-full border-[10px] border-dashed border-blossom-300 ${spinning ? 'animate-spin-slow' : ''}`} />
        <div className="absolute h-4 w-4 -translate-y-24 rounded-full bg-blossom-600" />
        <p className="relative z-10 max-w-[9rem] font-display text-xl text-blossom-800">{line}</p>
      </div>
      <button type="button" className="btn-primary mt-8" onClick={spin} disabled={spinning}>
        {spinning ? 'Spinning…' : 'Spin'}
      </button>
    </div>
  );
}
