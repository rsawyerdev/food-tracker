import { suggestions } from '@/constants/Utils';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default React.forwardRef(function (props, ref) {
  const { storeData, freeText, setFreeText } = props;
  const [date, setDate] = useState(new Date(Date.now()));

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.4}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior='close'
      />
    ),
    []
  );

  const handleSnap = [300];

  const addItem = () => {
    storeData(date);
    ref?.current.dismiss();
  };

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={handleSnap}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView
        style={{
          flex: 1,
          height: 300,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>When does the {freeText} expire?</Text>
          <DateTimePicker
            testID='dateTimePicker'
            value={date}
            mode={'date'}
            is24Hour={true}
            onChange={onChange}
          />
          <Button title='done' onPress={addItem} />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {},
  textInput: {
    height: 50,
    width: 150,
    fontSize: 18,
    marginBottom: 12,
    paddingLeft: 8,
    backgroundColor: 'lightblue',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  itemText: {
    paddingVertical: 5,
    fontSize: 18,
  },
  text: {
    fontFamily: 'regular',
  },
});
