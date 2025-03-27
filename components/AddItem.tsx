import { suggestions } from '@/constants/Utils';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useRef, useState } from 'react';
import { Button, FlatList, StyleSheet, View, Text } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';

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

  const handleSnap = [300];

  const getSuggestions = useCallback(async (q) => {
    const filterToken = q.toLowerCase();
    setFreeText(filterToken);

    if (typeof q !== 'string' || q.length < 1) {
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
          height: 300,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <View style={styles.textContainer}>
          <BottomSheetTextInput
            style={[styles.textInput]}
            placeholder={freeText}
            value={freeText}
            onChangeText={setFreeText && getSuggestions}
            enablesReturnKeyAutomatically
            onSubmitEditing={() => setFreeText('')}
            clearTextOnFocus
          />
          <View>
            <Button
              title='enter'
              onPress={() => storeData('add')}
              disabled={!freeText}
              color='blue'
            />
          </View>
        </View>
        <FlatList
          data={suggestionsList}
          renderItem={(suggestion) => (
            <View>
              <Pressable onPress={() => setFreeText(suggestion.item.title)}>
                <Text style={[styles.itemText]}>{suggestion.item.title}</Text>
              </Pressable>
            </View>
          )}
        />
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
});
