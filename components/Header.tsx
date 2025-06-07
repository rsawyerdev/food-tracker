import { router } from 'expo-router';
import React from 'react';

import { AntDesign } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, useWindowDimensions } from 'react-native';

export function Header(props: any) {
  const { width } = useWindowDimensions();
  return (
    <Pressable
      onPress={() => router.back()}
      style={[styles.headerContainer, { width: width }]}
    >
      <AntDesign
        name='arrowleft'
        size={30}
        color='black'
        style={styles.backIcon}
      />
      <Text
        style={{
          fontSize: 24,
          textAlign: 'center',
          fontFamily: 'bold',
        }}
      >
        {props.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backIcon: {
    position: 'absolute',
    left: 8,
    top: 0,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
});
