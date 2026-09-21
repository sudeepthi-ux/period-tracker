import { useEffect, useState } from 'react';

const STEPS = [
  { label: 'Inhale', seconds: 4, className: 'from-sky-300 to-blossom-300' },
  { label: 'Hold', seconds: 4, className: 'from-dusk-200 to-dusk-400' },
  { label: 'Exhale', seconds: 6, className: 'from-blossom-400 to-blossom-600' },
];

export default function BreathingExercise() {
  const [index, setIndex] = useState(0);
  const [remaining, setRemaining] = useState(STEPS[0].seconds);
  const [running, setRunning] = useState(true);
  const step = STEPS[index];

  useEffect(() => {
    if (!running) return undefined;

    if (remaining > 0) {
      const timer = setTimeout(() => setRemaining((value) => value - 1), 1000);
      return () => clearTimeout(timer);
    }

    const next = (index + 1) % STEPS.length;
    setIndex(next);
    setRemaining(STEPS[next].seconds);
    return undefined;
  }, [running, remaining, index]);

  return (
    <div className="text-center">
      <h2 className="font-display text-3xl text-blossom-800">Breathing exercise</h2>
      <p className="mt-2 text-sm text-blossom-600">Follow the circle. Inhale 4 · hold 4 · exhale 6.</p>
      <div className="relative mx-auto mt-10 grid h-56 w-56 place-items-center">
        <div className={`absolute h-40 w-40 rounded-full bg-gradient-to-br ${step.className} opacity-70 blur-2xl`} />
        <div className="absolute h-36 w-36 animate-breathe rounded-full bg-white/80 shadow-card" />
        <div className="relative z-10">
          <p className="font-display text-3xl text-blossom-800">{step.label}</p>
          <p className="text-4xl font-extrabold text-blossom-600">{remaining}</p>
        </div>
      </div>
      <button type="button" className="btn-primary mt-8" onClick={() => setRunning((value) => !value)}>
        {running ? 'Pause' : 'Resume'}
      </button>
    </div>
  );
}
