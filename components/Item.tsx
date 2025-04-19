import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Text,
  Pressable,
  useWindowDimensions,
  Platform,
} from 'react-native';
import React, { useState } from 'react';

export default function ItemCard(props: any) {
  const web = Platform.OS == 'web';

  const { containerStyle, index, deleteItem, name, displayDate } = props;
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, containerStyle, { width: width }]}>
      <View
        style={{
          borderColor: 'black',
          borderWidth: 0.5,
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text>{name}</Text>
        <Text numberOfLines={1} style={{ width: width / 2 }}>
          {/* TODO more dynamic i.e determine weeks, months, years from now */}
          Expires:{displayDate} days from now
        </Text>
      </View>
      <View style={styles.deleteButton}>
        <Button
          title='Delete'
          color={web ? 'red' : 'white'}
          onPress={() => deleteItem(index)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 4,
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
  },
  deleteButton: {
    borderRadius: 10,
    color: 'red',
    backgroundColor: 'red',
  },
});
