import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Autocomplete, TextField } from '@mui/material';
import React, { useCallback } from 'react';
import { Button, KeyboardAvoidingView, StyleSheet } from 'react-native';

export default React.forwardRef(function (props, ref) {
  const { storeData, freeText, setFreeText } = props;

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

  const handleSnap = [160];

  const suggestions = [
    'salt',
    'pepper',
    'olive oil',
    'bread',
    'milk',
    'eggs',
    'chicken breast',
    'whole chicken',
    'carrots',
    'apples',
    'lemons',
    'blueberries',
    'yogurt',
    'salmon',
  ];

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={handleSnap}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView>
        <KeyboardAvoidingView style={styles.textContainer} behavior='padding'>
          <Autocomplete
            disablePortal
            options={suggestions}
            onChange={(event, newValue) => setFreeText(newValue)}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label='Food item' />
            )}
            onKeyDown={(press) => press.key == 'Enter' && storeData()}
          />
          <Button
            title='enter'
            onPress={() => storeData('add')}
            disabled={!freeText}
          />
        </KeyboardAvoidingView>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {},
  textInput: {
    height: 50,
    width: 100,
    backgroundColor: 'pink',
    marginBottom: 12,
    paddingLeft: 8,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 160,
  },
});
