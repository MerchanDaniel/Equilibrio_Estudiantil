import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { createContext, useContext } from 'react';
import { usePomodoro } from '../hook/UsePomodoro';

type PomodoroContextType = ReturnType<typeof usePomodoro>;
const PomodoroContext = createContext<PomodoroContextType | null>(null);

export const useSharedPomodoro = () => {
  const ctx = useContext(PomodoroContext);
  if (!ctx) throw new Error('useSharedPomodoro debe usarse dentro de PomodoroProvider');
  return ctx;
};

export default function RootLayout() {
  const pomodoro = usePomodoro();

  return (
    <PomodoroContext.Provider value={pomodoro}>
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: '#0f172a' },
          headerTintColor: '#f8fafc',
          tabBarStyle: { backgroundColor: '#0f172a', borderTopColor: '#1e293b' },
          tabBarActiveTintColor: '#818cf8',
          tabBarInactiveTintColor: '#94a3b8',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Temporizador',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="timer-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            title: 'Resumen',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="stats-chart-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="tips"
          options={{
            title: 'Bienestar',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="leaf-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </PomodoroContext.Provider>
  );
}