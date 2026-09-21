import { useState } from 'react';
import BreathingExercise from './games/BreathingExercise';
import GratitudeJar from './games/GratitudeJar';
import MoodBooster from './games/MoodBooster';
import StretchingGuide from './games/StretchingGuide';
import AffirmationSpinner from './games/AffirmationSpinner';

const GAMES = [
  { id: 'breathe', title: 'Breathing exercise', blurb: 'A visual 4-4-6 wave for cramps and spirals.', emoji: '🌬️' },
  { id: 'gratitude', title: 'Gratitude jar', blurb: 'Write three small good things. Watch the jar fill.', emoji: '🫙' },
  { id: 'match', title: 'Mood booster', blurb: 'A gentle matching game with cozy icons.', emoji: '🧩' },
  { id: 'stretch', title: 'Stretching guide', blurb: 'Five period-friendly stretches, no equipment.', emoji: '🧘' },
  { id: 'spin', title: 'Affirmation spinner', blurb: 'Spin for a sentence to keep in your pocket.', emoji: '🎡' },
];

export default function GamesHub() {
  const [active, setActive] = useState(null);

  return (
    <div className="grid gap-5">
      {!active && (
        <section className="grid gap-4 sm:grid-cols-2">
          {GAMES.map((game) => (
            <button
              key={game.id}
              type="button"
              onClick={() => setActive(game.id)}
              className="card text-left transition hover:-translate-y-0.5"
            >
              <div className="text-3xl">{game.emoji}</div>
              <h3 className="mt-2 font-display text-2xl text-blossom-800">{game.title}</h3>
              <p className="mt-1 text-sm text-blossom-600">{game.blurb}</p>
            </button>
          ))}
        </section>
      )}

      {active && (
        <div className="card">
          <button type="button" className="btn-ghost mb-4" onClick={() => setActive(null)}>
            ← All lifts
          </button>
          {active === 'breathe' && <BreathingExercise />}
          {active === 'gratitude' && <GratitudeJar />}
          {active === 'match' && <MoodBooster />}
          {active === 'stretch' && <StretchingGuide />}
          {active === 'spin' && <AffirmationSpinner />}
        </div>
      )}
    </div>
  );
}
