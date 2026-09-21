import { TrackerProvider, useTracker } from './context/TrackerContext';
import AuthScreen from './components/AuthScreen';
import Shell from './components/Shell';

export default function App() {
  return (
    <TrackerProvider>
      <Gate />
    </TrackerProvider>
  );
}

function Gate() {
  const { user, unlocked } = useTracker();
  if (!user || !unlocked) return <AuthScreen />;
  return <Shell />;
}
