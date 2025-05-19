import {
  Text,
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

import ItemCard from '@/components/Item';
import { useRef } from 'react';
import AddItem from '@/components/AddItem';
import AntDesign from '@expo/vector-icons/AntDesign';

import React from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useStorage } from '@/app/storage/storageState';
import AddExpiration from '@/components/AddExpiration';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Location() {
  const { location } = useLocalSearchParams();

  const {
    setFreeText,
    freeText,
    refrigeratorList,
    storeRefrigeratorList,
    freezerList,
    storeFreezerList,
    pantryList,
    storePantryList,
  } = useStorage();

  const addItemRef = useRef<BottomSheetModal>(null);
  const addAdditionalRef = useRef<BottomSheetModal>(null);

  const { width } = useWindowDimensions();

  const list =
    location == 'Refrigerator'
      ? refrigeratorList
      : location == 'Freezer'
      ? freezerList
      : pantryList;

  const store =
    location == 'Refrigerator'
      ? storeRefrigeratorList
      : location == 'Freezer'
      ? storeFreezerList
      : storePantryList;

  const storeData = async (date: Date) => {
    let lastID = list && list.length > 0 ? list.at(-1).id : 1;

    if (!freeText) return;

    const newListItem = {
      name: freeText,
      date: date.toString(),
      id: lastID + 1,
    };
    list.push(newListItem);
    setFreeText('');
    store(list, 'add');
  };


  const deleteItem = (index: number) => {
    const newList = list.toSpliced(index, 1);
    store(newList, 'delete');
  };

  const _renderItem = ({ item, index }: { item: any; index: number }) => {
    const timeFromNow = new Date(item.date).getDate() - new Date().getDate();
    return (
      <ItemCard
        name={item.name}
        deleteItem={deleteItem}
        index={index}
        date={item.date}
        displayDate={timeFromNow}
      />
    );
  };

  return (
    <Pressable
      onPress={Keyboard.dismiss}
      style={[styles.container, { width: width }]}
    >
      <Pressable
        style={[styles.additionIcon]}
        onPress={() => addItemRef.current?.present()}
      >
        <AntDesign name='pluscircleo' size={48} color='black' />
      </Pressable>

      <View style={{ flex: 1, width: width }}>
        <FlatList
          data={list}
          keyExtractor={(item, index) => `${item.id}`}
          renderItem={_renderItem}
          ListFooterComponent={<View style={{ marginBottom: 60 }} />}
        />

        <AddItem
          ref={addItemRef}
          freeText={freeText}
          setFreeText={setFreeText}
          dismiss={() => {
            addItemRef.current?.dismiss();
            addAdditionalRef.current?.present();
          }}
        />
        <AddExpiration
          ref={addAdditionalRef}
          freeText={freeText}
          storeData={storeData}
        />
        <LinearGradient
          colors={[
            'rgba(244, 245, 248, 0)',
            'rgba(244, 245, 248, 0.7)',
            'rgba(244, 245, 248, 1)',
          ]}
          style={{
            position: 'absolute',
            width: '100%',
            paddingHorizontal: 24,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 100,
            bottom: 0,
          }}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    marginTop: 40,
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
  additionIcon: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
    zIndex: 1,
  },
});
