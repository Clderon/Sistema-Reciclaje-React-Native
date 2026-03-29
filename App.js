import React, { useEffect } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { loadSoundPreference, loadMusicPreferences } from './src/utils/soundHelper';

export default function App() {
  useEffect(() => {
    loadSoundPreference();
    loadMusicPreferences();
  }, []);

  return (
    <RootSiblingParent>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </RootSiblingParent>
  );
}
