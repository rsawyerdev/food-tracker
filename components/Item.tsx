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
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ItemCard(props: any) {
  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const web = Platform.OS == 'web';

  const { deleteItem, containerStyle, item, index } = props;

  const { width } = useWindowDimensions();

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

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
        <TextInput placeholder='Product Name' value={item.name} />
        {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
        <Pressable onPress={() => setShow(true)}>
          <Text>Added: {date.toDateString()}</Text>
        </Pressable>
        {show && (
          <DateTimePicker
            testID='dateTimePicker'
            value={date}
            mode={'date'}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </View>
      <View style={styles.deleteButton}>
        <Button
          title='Delete'
          color={web ? 'red' : 'white'}
          onPress={() => deleteItem(item, index)}
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
    width: '80%',
  },
  deleteButton: {
    borderRadius: 10,
    color: 'red',
    backgroundColor: 'red',
  },
});
