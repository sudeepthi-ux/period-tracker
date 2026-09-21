import { useState } from 'react';
import { useTracker } from '../context/TrackerContext';
import Dashboard from './Dashboard';
import CalendarView from './CalendarView';
import MoodTracker from './MoodTracker';
import SymptomTracker from './SymptomTracker';
import GamesHub from './GamesHub';

const TABS = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'calendar', label: 'Cycle', icon: '📅' },
  { id: 'mood', label: 'Mood', icon: '🌈' },
  { id: 'symptoms', label: 'Body', icon: '💗' },
  { id: 'games', label: 'Lift', icon: '✨' },
];

export default function Shell() {
  const [tab, setTab] = useState('home');
  const { user, logout } = useTracker();

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 pb-28 pt-6 sm:px-6 lg:pb-10 lg:pt-8">
      <header className="mb-6 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-blossom-500">Private · On-device</p>
          <h1 className="font-display text-3xl font-semibold text-blossom-800 sm:text-4xl">Flow & Mood</h1>
          <p className="mt-1 text-sm text-blossom-700/70">
            {user?.name ? `Welcome back, ${user.name}.` : 'Period tracking, gentle insights, and tiny mood lifts.'}
          </p>
        </div>
        <button type="button" className="btn-ghost" onClick={logout}>
          Log out
        </button>
      </header>

      <nav className="mb-6 hidden gap-2 lg:flex">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              tab === item.id ? 'bg-blossom-600 text-white shadow-card' : 'bg-white/70 text-blossom-700 hover:bg-white'
            }`}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </nav>

      <main>
        {tab === 'home' && <Dashboard onOpen={setTab} />}
        {tab === 'calendar' && <CalendarView />}
        {tab === 'mood' && <MoodTracker />}
        {tab === 'symptoms' && <SymptomTracker />}
        {tab === 'games' && <GamesHub />}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/60 bg-white/85 px-3 py-2 backdrop-blur-md lg:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-5 gap-1">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`rounded-2xl px-1 py-2 text-center text-[11px] font-bold ${
                tab === item.id ? 'bg-blossom-100 text-blossom-700' : 'text-blossom-500'
              }`}
            >
              <div className="text-lg leading-none">{item.icon}</div>
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
