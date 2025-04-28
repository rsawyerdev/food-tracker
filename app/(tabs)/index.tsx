import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CerealBox from '@/components/CerealBox';

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
                params: { location: 'Freezer' },
              })
            }
          >
            <FontAwesome6 name='snowflake' size={68} color='darkblue' />
            <View style={styles.freezerHandle} />
          </Pressable>
          <Pressable
            style={styles.refrigeratorContainer}
            onPress={() =>
              router.push({
                pathname: '/(tabs)/locations',
                params: { location: 'Refrigerator' },
              })
            }
          >
            <FontAwesome6 name='snowflake' size={68} color='lightblue' />
            <View style={styles.refrigeratorHandle} />
          </Pressable>
        </View>
        <Pressable
          style={styles.pantryContainer}
          onPress={() =>
            router.push({
              pathname: '/(tabs)/locations',
              params: { location: 'Pantry' },
            })
          }
        >
          <View style={styles.cerealContainer}>
            <CerealBox
              borderColor='#317506'
              backgroundColor='#3e9407'
              textColor='#122b01'
            />
            <CerealBox
              textColor='#e3aade'
              borderColor='#5e0056'
              backgroundColor='#852a7d'
            />
            <CerealBox
              textColor='#023557'
              backgroundColor='#1396ed'
              borderColor='#013152'
            />
            <CerealBox
              borderColor='#521d01'
              backgroundColor='#943604'
              textColor='#c96d3c'
            />
            <CerealBox
              borderColor='#3d2234'
              backgroundColor='#8c4f78'
              textColor='#ff91db'
            />
          </View>
          <View style={[styles.pantryShelf, { top: 60 }]} />
          <View
            style={{
              flexDirection: 'row',
              top: 100,
              width: '100%',
              justifyContent: 'space-evenly',
              paddingHorizontal: 12,
            }}
          >
            <FontAwesome6 name='bread-slice' size={32} color='tan' />
            <FontAwesome6 name='bowl-rice' size={32} color='#fff' />
            <FontAwesome6 name='apple-whole' size={32} color='#c70404' />
          </View>
          <View style={[styles.pantryShelf, { top: 100 }]} />
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ded5c8',
  },
  pantryShelf: {
    borderBottomWidth: 1,
    borderBottomColor: '#c2baae',
    width: '80%',
    shadowColor: '#7a756d',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
  },
  cerealContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    width: '100%',
    justifyContent: 'space-evenly',
  },
});
