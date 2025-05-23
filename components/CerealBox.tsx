import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CerealBox(props: any) {
  const { borderColor, backgroundColor, textColor } = props;
  return (
    <View
      style={[
        styles.cerealBox,
        {
          borderColor: borderColor,
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <Text
        style={[
          styles.cerealText,
          {
            color: textColor,
          },
        ]}
      >
        cereal
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cerealBox: {
    height: 50,
    width: 10,
    borderWidth: 0.5,
    top: 60,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  cerealText: { fontSize: 6, width: 5, textAlign: 'center' },
});
