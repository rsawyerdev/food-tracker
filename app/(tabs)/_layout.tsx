import { Link, Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Refrigerator',
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name='fridge-bottom'
              size={24}
              color='black'
            />
          ),
        }}
      />
      <Tabs.Screen
        name='freezer'
        options={{
          title: 'Freezer',
          tabBarIcon: () => (
            <MaterialCommunityIcons name='fridge-top' size={24} color='black' />
          ),
        }}
      />
      <Tabs.Screen
        name='pantry'
        options={{
          title: 'Pantry',
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name='bread-slice-outline'
              size={24}
              color='black'
            />
          ),
        }}
      />
      <Tabs.Screen
        name='counter'
        options={{
          title: 'Counter',
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name='store-marker'
              size={24}
              color='black'
            />
          ),
        }}
      />
      <Tabs.Screen
        name='recipes'
        options={{
          title: 'Recipes',
          tabBarIcon: () => (
            <FontAwesome name='list-alt' size={24} color='black' />
          ),
        }}
      />
    </Tabs>
  );
}
