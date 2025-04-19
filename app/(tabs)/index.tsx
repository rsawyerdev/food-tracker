import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

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
            <FontAwesome5 name='snowflake' size={68} color='darkblue' />
            <View style={styles.freezerHandle} />
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
            <FontAwesome5 name='snowflake' size={68} color='lightblue' />
            <View style={styles.refrigeratorHandle} />
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
          <FontAwesome5 name='bread-slice' size={68} color='tan' />
          {/* <View style={[styles.pantrySector, { top: 1 }]} /> */}

          <View style={[styles.pantrySector, { top: 60 }]} />
          <View style={[styles.pantrySector, { top: 80 }]} />
          <View style={[styles.pantrySector, { top: 100 }]} />
          <View style={[styles.pantrySector, { top: 120 }]} />
          <View style={[styles.pantrySector, { top: 140 }]} />

          <View style={[styles.pantrySector, { top: 200 }]} />
          <View style={[styles.pantrySector, { top: 220 }]} />
          <View style={[styles.pantrySector, { top: 240 }]} />
          <View style={[styles.pantrySector, { top: 260 }]} />
          <View style={[styles.pantrySector, { top: 280 }]} />

          <View style={[styles.pantrySector, { top: 340 }]} />
          <View style={[styles.pantrySector, { top: 360 }]} />
          <View style={[styles.pantrySector, { top: 380 }]} />
          <View style={[styles.pantrySector, { top: 400 }]} />
          <View style={[styles.pantrySector, { top: 420 }]} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kitchenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  freezerContainer: {
    height: 175,
    width: 150,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  freezerHandle: {
    borderWidth: 0.5,
    height: 80,
    width: 10,
    position: 'absolute',
    right: 8,
  },
  refrigeratorHandle: {
    borderWidth: 0.5,
    height: 125,
    width: 10,
    position: 'absolute',
    right: 8,
  },
  refrigeratorContainer: {
    height: 300,
    width: 150,
    borderWidth: 1,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pantryContainer: {
    height: 475,
    width: 150,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pantrySector: {
    borderBottomWidth: 1,
    position: 'absolute',

    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
    zIndex: -1,
  },
});
