import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../utils/constants';
import {
  playBackgroundMusic,
  stopBackgroundMusic,
  isMusicEnabled,
} from '../utils/soundHelper';
import LoginScreen from '../screens/LoginScreen';
import StudentLoginScreen from '../screens/StudentLoginScreen';
import StudentRegisterScreen from '../screens/StudentRegisterScreen';
import TeacherLoginScreen from '../screens/TeacherLoginScreen';
import StudentTabs from './StudentTabs';
import TeacherTabs from './TeacherTabs';

const Stack = createStackNavigator();

function MainTabs() {
  const { user } = useAuth();
  if (user?.role === 'student') {
    return <StudentTabs />;
  }
  return <TeacherTabs />;
}

function AppNavigator() {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    let isMounted = true;
    let timeoutId = null;
    let isHandling = false;

    const handleMusic = async () => {
      if (!isMounted || isHandling) return;
      isHandling = true;

      try {
        if (isAuthenticated && isMusicEnabled()) {
          await playBackgroundMusic('calm_background_loop.wav', {
            volume: 0.20,
            loop: true,
          });
        } else {
          await stopBackgroundMusic();
        }
      } finally {
        isHandling = false;
      }
    };

    timeoutId = setTimeout(() => {
      handleMusic();
    }, 300);

    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (!isAuthenticated) {
        stopBackgroundMusic();
      }
    };
  }, [isAuthenticated, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.target }}>
        <ActivityIndicator size="large" color={COLORS.button} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} onLogin={() => {}} />}
            </Stack.Screen>
            <Stack.Screen name="StudentLogin" component={StudentLoginScreen} />
            <Stack.Screen name="StudentRegister" component={StudentRegisterScreen} />
            <Stack.Screen name="TeacherLogin" component={TeacherLoginScreen} />
          </>
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
