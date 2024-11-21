import { StyleSheet, TextInput,View, Button, Text, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';


export default function ItemCard(props: any) {

    const [date, setDate] = useState(new Date(Date.now()));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event:any, selectedDate: any) => {
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
    <View style={[styles.container, props.containerStyle]}>
      <View style={{borderColor: 'black', borderWidth: .5, padding: 10, borderRadius: 10}}>
        <TextInput placeholder='Product Name' value={props.name}/>
      {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
      <Pressable onPress={()=>setShow(true)}>
      {/* <Text>Added: {date.toDateString()}</Text> */}
      </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          onChange={onChange}
        />
      )}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
