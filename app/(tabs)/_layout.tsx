import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name='fridge-bottom'
              size={24}
              color='black'
            />
          ),
          tabBarLabelStyle: { fontFamily: 'Nunito_400Regular', fontSize: 12 },
          headerShown: true,
          title: 'Kitchen',

          headerTitleStyle: {
            fontSize: 24,
            fontFamily: 'Nunito_900Black',
          },
        }}
      />

      <Tabs.Screen
        name='recipes'
        options={{
          title: 'Recipes',
          tabBarIcon: () => (
            <FontAwesome name='list-alt' size={24} color='black' />
          ),
          tabBarLabelStyle: { fontFamily: 'Nunito_400Regular', fontSize: 12 },
        }}
      />
      <Tabs.Screen
        name='locations'
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
