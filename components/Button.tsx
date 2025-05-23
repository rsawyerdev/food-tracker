import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export function Button({
  title,
  onButtonPress,
  textColor,
  backgroundColor,
  styleProps,
}: {
  title: string;
  onButtonPress: () => void;
  textColor: string;
  backgroundColor: string;
  styleProps?: any;
}) {
  return (
    <Pressable
      onPress={onButtonPress}
      style={[
        { ...styleProps, backgroundColor: backgroundColor },
        styles.container,
      ]}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: { padding: 12, fontFamily: 'regular', textAlign: 'center' },
});
