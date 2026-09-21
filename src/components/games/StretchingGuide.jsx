const STRETCHES = [
  {
    name: 'Child’s pose',
    hold: '45–60 seconds',
    how: 'Knees wide, sit back toward your heels, arms reaching forward. Let your belly soften toward the floor.',
  },
  {
    name: 'Cat-cow',
    hold: '8 slow rounds',
    how: 'On all fours, inhale to drop the belly and lift the chest, exhale to round the spine.',
  },
  {
    name: 'Supine twist',
    hold: '30 seconds each side',
    how: 'Lie on your back, knees to one side, opposite shoulder heavy on the mat. Breathe into the waist.',
  },
  {
    name: 'Figure-four hip opener',
    hold: '40 seconds each side',
    how: 'On your back, cross one ankle over the opposite thigh and draw the legs in toward you.',
  },
  {
    name: 'Legs up the wall',
    hold: '3–5 minutes',
    how: 'Scoot your hips to a wall, legs vertical, arms open. This is rest with a job: drain and calm.',
  },
];

export default function StretchingGuide() {
  return (
    <div>
      <h2 className="font-display text-3xl text-blossom-800">Period-friendly stretches</h2>
      <p className="mt-2 text-sm text-blossom-600">Move only as far as comfort. Skip anything that spikes pain.</p>
      <ol className="mt-5 space-y-3">
        {STRETCHES.map((stretch, index) => (
          <li key={stretch.name} className="rounded-2xl bg-blossom-50 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-blossom-400">Stretch {index + 1}</p>
            <h3 className="font-display text-xl text-blossom-800">{stretch.name}</h3>
            <p className="text-sm font-bold text-blossom-600">{stretch.hold}</p>
            <p className="mt-1 text-sm text-blossom-700/80">{stretch.how}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
