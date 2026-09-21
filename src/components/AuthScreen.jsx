import { useState } from 'react';
import { useTracker } from '../context/TrackerContext';
import { todayISO } from '../utils/dates';

export default function AuthScreen() {
  const { user, createAccount, login } = useTracker();
  return user ? <LoginForm name={user.name} onLogin={login} /> : <SignupForm onCreate={createAccount} />;
}

function LoginForm({ name, onLogin }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const submit = (event) => {
    event.preventDefault();
    if (!onLogin(pin)) setError('That PIN does not match.');
  };

  return (
    <AuthFrame
      eyebrow="Welcome back"
      title={`Hi, ${name}.`}
      copy="Enter your 4-digit PIN to open your private tracker."
    >
      <form onSubmit={submit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-bold text-blossom-700">PIN</span>
          <input
            type="password"
            inputMode="numeric"
            pattern="\d{4}"
            maxLength={4}
            value={pin}
            onChange={(event) => {
              setPin(event.target.value.replace(/\D/g, '').slice(0, 4));
              setError('');
            }}
            className="mt-2 w-full rounded-2xl bg-blossom-50 px-4 py-3 text-center text-2xl tracking-[0.4em] text-blossom-800 ring-1 ring-blossom-100"
            placeholder="••••"
            autoFocus
          />
        </label>
        {error ? <p className="text-sm font-semibold text-rose-600">{error}</p> : null}
        <button type="submit" className="btn-primary w-full" disabled={pin.length !== 4}>
          Unlock
        </button>
      </form>
    </AuthFrame>
  );
}

function SignupForm({ onCreate }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [lastPeriodStart, setLastPeriodStart] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);

  const next = (event) => {
    event.preventDefault();
    if (!name.trim() || pin.length !== 4) return;
    setStep(2);
  };

  const finish = (event) => {
    event.preventDefault();
    if (!lastPeriodStart) return;
    onCreate({ name, pin, lastPeriodStart, cycleLength, periodLength });
  };

  return (
    <AuthFrame
      eyebrow={step === 1 ? 'Create your space' : 'Your last cycle'}
      title={step === 1 ? 'Flow & Mood' : 'When did your last period start?'}
      copy={
        step === 1
          ? 'A private period and wellness tracker. Your data stays on this device.'
          : 'We will estimate your next period, ovulation, and higher-chance fertile days from this.'
      }
    >
      {step === 1 ? (
        <form onSubmit={next} className="space-y-4">
          <Field label="Your name">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-2xl bg-blossom-50 px-4 py-3 text-blossom-800 ring-1 ring-blossom-100"
              placeholder="What should we call you?"
              required
            />
          </Field>
          <Field label="Create a 4-digit PIN">
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={pin}
              onChange={(event) => setPin(event.target.value.replace(/\D/g, '').slice(0, 4))}
              className="mt-2 w-full rounded-2xl bg-blossom-50 px-4 py-3 text-center text-2xl tracking-[0.4em] text-blossom-800 ring-1 ring-blossom-100"
              placeholder="••••"
              required
            />
          </Field>
          <button type="submit" className="btn-primary w-full" disabled={!name.trim() || pin.length !== 4}>
            Continue
          </button>
        </form>
      ) : (
        <form onSubmit={finish} className="space-y-5">
          <Field label="Last period start date">
            <input
              type="date"
              max={todayISO()}
              value={lastPeriodStart}
              onChange={(event) => setLastPeriodStart(event.target.value)}
              className="mt-2 w-full rounded-2xl bg-blossom-50 px-4 py-3 text-blossom-800 ring-1 ring-blossom-100"
              required
            />
          </Field>
          <Field label={`Typical cycle length · ${cycleLength} days`}>
            <input
              type="range"
              min="21"
              max="40"
              value={cycleLength}
              onChange={(event) => setCycleLength(Number(event.target.value))}
              className="mt-3 w-full accent-blossom-600"
            />
          </Field>
          <Field label={`Typical period length · ${periodLength} days`}>
            <input
              type="range"
              min="2"
              max="10"
              value={periodLength}
              onChange={(event) => setPeriodLength(Number(event.target.value))}
              className="mt-3 w-full accent-blossom-600"
            />
          </Field>
          <p className="text-xs leading-relaxed text-blossom-500">
            Estimates only — not contraception or medical advice. Cycles vary, especially with stress, illness, or
            hormonal birth control.
          </p>
          <div className="flex gap-2">
            <button type="button" className="btn-ghost flex-1" onClick={() => setStep(1)}>
              Back
            </button>
            <button type="submit" className="btn-primary flex-1" disabled={!lastPeriodStart}>
              Start tracking
            </button>
          </div>
        </form>
      )}
    </AuthFrame>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-blossom-700">{label}</span>
      {children}
    </label>
  );
}

function AuthFrame({ eyebrow, title, copy, children }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-blossom-500">{eyebrow}</p>
      <h1 className="mt-2 font-display text-4xl text-blossom-800">{title}</h1>
      <p className="mt-2 text-sm text-blossom-700/80">{copy}</p>
      <div className="card mt-8">{children}</div>
    </div>
  );
}
