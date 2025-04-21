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
import React from 'react';
import Reanimated from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function ItemCard(props: any) {
  const { index, deleteItem, name, displayDate } = props;
  const { width } = useWindowDimensions();

  const rightAction = (
    prog: SharedValue<number>,
    drag: SharedValue<number>
  ) => {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value + 100 }],
      };
    });
    return (
      <Reanimated.View style={[styleAnimation, styles.buttonsContainer]}>
        <Pressable style={styles.button}>
          <FontAwesome6 name='edit' size={24} color='#028df7' />
        </Pressable>
        <Pressable style={styles.button} onPress={() => deleteItem(index)}>
          <FontAwesome6 name='trash' size={24} color='#b50214' />
        </Pressable>
      </Reanimated.View>
    );
  };

  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        containerStyle={styles.container}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={rightAction}
      >
        <View
          style={{
            borderColor: 'black',
            borderWidth: 0.5,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text>{name}</Text>
          <Text numberOfLines={1} style={{ width: width / 1.5 }}>
            {/* TODO more dynamic i.e determine weeks, months, years from now */}
            Expires:{displayDate} days from now
          </Text>
        </View>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
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
  buttonsContainer: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  deleteButton: {
    borderRadius: 10,
    color: 'red',
    backgroundColor: 'red',
  },
  button: { padding: 10 },
});
