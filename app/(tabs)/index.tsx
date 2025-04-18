import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

export default function Kitchen() {
  return (
    <View style={styles.container}>
      <View style={styles.kitchenContainer}>
        <View>
          <Pressable
            style={styles.freezerContainer}
            onPress={() =>
              router.push({
                pathname: '/(tabs)/locations',
                params: { location: 'freezer' },
              })
            }
          >
            <Text>Freezer</Text>
          </Pressable>
          <Pressable
            style={styles.refrigeratorContainer}
            onPress={() =>
              router.push({
                pathname: '/(tabs)/locations',
                params: { location: 'refrigerator' },
              })
            }
          >
            <Text>Refrigerator</Text>
          </Pressable>
        </View>
        <Pressable
          style={styles.pantryContainer}
          onPress={() =>
            router.push({
              pathname: '/(tabs)/locations',
              params: { location: 'pantry' },
            })
          }
        >
          <Text>Pantry</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  kitchenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  refrigeratorContainer: {
    height: 300,
    width: 150,
    borderWidth: 1,
  },
  freezerContainer: {
    height: 175,
    width: 150,
    borderWidth: 1,
  },
  pantryContainer: {
    height: 150,
    width: 500,
    borderWidth: 1,
  },
});
