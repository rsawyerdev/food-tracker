import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useRef, useState } from 'react';
import { Button, FlatList, StyleSheet, View, Text } from 'react-native';

export default React.forwardRef(function (props, ref) {
  const { storeData, freeText, setFreeText } = props;
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);

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

  const handleSnap = [250];

  const suggestions = [
    { title: 'salt', id: '1' },
    { title: 'pepper', id: '2' },
    { title: 'bread', id: '3' },
    { title: 'milk', id: '4' },
    { title: 'eggs', id: '5' },
    { title: 'chicken breast', id: '6' },
    { title: 'whole chicken', id: '7' },
    { title: 'carrots', id: '8' },
    { title: 'apples', id: '9' },
    { title: 'lemons', id: '10' },
    { title: 'blueberries', id: '11' },
    { title: 'yogurt', id: '12' },
    { title: 'salmon', id: '13' },
  ];

  const getSuggestions = useCallback(async (q) => {
    const filterToken = q.toLowerCase();
    setFreeText(filterToken);

    if (typeof q !== 'string' || q.length < 2) {
      setSuggestionsList(null);
      return;
    }
    setLoading(true);
    const suggestionList = suggestions
      .filter((item) => item.title.toLowerCase().includes(filterToken))
      .map((item) => ({
        id: item.id,
        title: item.title,
      }));
    console.log('after filter', suggestionList);
    setSuggestionsList(suggestionList);
    setLoading(false);
  }, []);

  const onClearPress = useCallback(() => {
    setSuggestionsList(null);
  }, []);

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={handleSnap}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView
        style={{
          flex: 1,
          height: 500,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <BottomSheetTextInput
          style={styles.textInput}
          placeholder='e.g. milk'
          value={freeText}
          onChangeText={setFreeText && getSuggestions}
          enablesReturnKeyAutomatically
          onSubmitEditing={() => storeData('add')}
        />
        <FlatList
          data={suggestionsList}
          renderItem={(suggestion) => (
            <View>
              <Text>{suggestion.item.title}</Text>
            </View>
          )}
        />

        <Button
          title='enter'
          onPress={() => storeData('add')}
          disabled={!freeText}
        />
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
