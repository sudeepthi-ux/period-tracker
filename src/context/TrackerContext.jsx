import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadState, saveState } from '../utils/storage';
import { fillRange } from '../utils/cycle';
import { addDays, todayISO } from '../utils/dates';
import { clearSession, hasSession, startSession } from '../utils/session';

const TrackerContext = createContext(null);

export function TrackerProvider({ children }) {
  const [state, setState] = useState(loadState);
  const [rangeAnchor, setRangeAnchor] = useState(null);
  const [unlocked, setUnlocked] = useState(() => hasSession());

  useEffect(() => {
    saveState(state);
  }, [state]);

  const api = useMemo(() => {
    const createAccount = ({ name, pin, lastPeriodStart, cycleLength, periodLength }) => {
      const periodDays = fillRange(lastPeriodStart, addDays(lastPeriodStart, Number(periodLength) - 1));
      setState((prev) => ({
        ...prev,
        user: { name: name.trim(), pin },
        settings: {
          cycleLength: Number(cycleLength),
          periodLength: Number(periodLength),
        },
        onboarded: true,
        periodDays: [...new Set([...prev.periodDays, ...periodDays])].sort(),
      }));
      startSession();
      setUnlocked(true);
    };

    const login = (pin) => {
      if (!state.user || state.user.pin !== pin) return false;
      startSession();
      setUnlocked(true);
      return true;
    };

    const logout = () => {
      clearSession();
      setUnlocked(false);
    };

    const togglePeriodDay = (iso) => {
      setState((prev) => {
        const exists = prev.periodDays.includes(iso);
        return {
          ...prev,
          periodDays: exists
            ? prev.periodDays.filter((day) => day !== iso)
            : [...prev.periodDays, iso].sort(),
        };
      });
      setRangeAnchor(null);
    };

    const markPeriodRange = (iso) => {
      if (!rangeAnchor) {
        setRangeAnchor(iso);
        return;
      }
      const days = fillRange(rangeAnchor, iso);
      setState((prev) => ({
        ...prev,
        periodDays: [...new Set([...prev.periodDays, ...days])].sort(),
      }));
      setRangeAnchor(null);
    };

    const logTodayPeriod = () => {
      const today = todayISO();
      setState((prev) => ({
        ...prev,
        periodDays: prev.periodDays.includes(today)
          ? prev.periodDays
          : [...prev.periodDays, today].sort(),
      }));
    };

    const setMood = (iso, mood) => {
      setState((prev) => ({
        ...prev,
        moods: {
          ...prev.moods,
          [iso]: { mood, at: Date.now() },
        },
      }));
    };

    const setSymptoms = (iso, payload) => {
      setState((prev) => ({
        ...prev,
        symptoms: {
          ...prev.symptoms,
          [iso]: {
            cramps: 0,
            headache: false,
            bloating: false,
            fatigue: false,
            notes: '',
            ...prev.symptoms[iso],
            ...payload,
          },
        },
      }));
    };

    const addGratitude = (items) => {
      setState((prev) => ({
        ...prev,
        gratitude: [{ id: Date.now(), date: todayISO(), items }, ...prev.gratitude].slice(0, 40),
      }));
    };

    return {
      ...state,
      settings: state.settings || { cycleLength: 28, periodLength: 5 },
      unlocked,
      rangeAnchor,
      setRangeAnchor,
      createAccount,
      login,
      logout,
      togglePeriodDay,
      markPeriodRange,
      logTodayPeriod,
      setMood,
      setSymptoms,
      addGratitude,
    };
  }, [state, rangeAnchor, unlocked]);

  return <TrackerContext.Provider value={api}>{children}</TrackerContext.Provider>;
}

export function useTracker() {
  const value = useContext(TrackerContext);
  if (!value) throw new Error('useTracker must be used inside TrackerProvider');
  return value;
}
