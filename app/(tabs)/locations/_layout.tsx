import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Header } from '@/components/Header';

export default function LocationsLayout() {
  const colorScheme = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='index'
        options={({ route }) => ({
          headerShown: true,
          headerTitle: (props: any) => (
            <Header {...props} title={route?.params.location} />
          ),
        })}
      />
    </Stack>
  );
}
