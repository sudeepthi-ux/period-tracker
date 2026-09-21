export const QUOTES = [
  'Your body is a superhero. Treat it with love.',
  'Cramps are temporary, you are forever.',
  'Rest is productive.',
  'Softness is a strength, not a pause.',
  'You do not have to bloom every day.',
  'Honor the season you are in.',
  'Hydrate, stretch, and give yourself grace.',
  'Your cycle is data, not a verdict.',
  'Slow days still count.',
  'You are allowed to take up space and take a nap.',
  'Tenderness is a form of power.',
  'Listen in. Your body is already speaking.',
];

export const AFFIRMATIONS = [
  'I am safe in my body.',
  'I deserve rest without guilt.',
  'My energy is enough for today.',
  'I treat myself with patience.',
  'I can move through this wave.',
  'I am allowed to ask for comfort.',
  'My feelings are valid and passing.',
  'I nourish myself with kindness.',
  'I trust my inner rhythm.',
  'I am more than this moment of pain.',
];

export function randomItem(list, except) {
  const pool = except ? list.filter((item) => item !== except) : list;
  return pool[Math.floor(Math.random() * pool.length)];
}
