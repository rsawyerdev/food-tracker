import { Link, Stack } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          title: 'Location TBD',
          headerShown: true,
          headerBackButtonDisplayMode: 'default',
        }}
      />
    </Stack>
  );
}
