import {
  Button,
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import ItemCard from '@/components/Item';
import { useState, useEffect, useRef } from 'react';
import AddItem from '@/components/AddItem';
import AntDesign from '@expo/vector-icons/AntDesign';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useStorage } from '@/api/context/storageState';
import AddExpiration from '@/components/AddExpiration';
import { useLocalSearchParams } from 'expo-router';

export default function RefrigeratorScreen() {
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
  const [dataRetrieved, setDataRetrieved] = useState<boolean>(false);

  const addItemRef = useRef<BottomSheetModal>(null);
  const addAdditionalRef = useRef<BottomSheetModal>(null);

  const list =
    location == 'refrigerator'
      ? refrigeratorList
      : location == 'freezer'
      ? freezerList
      : pantryList;

  const store =
    location == 'refrigerator'
      ? storeRefrigeratorList
      : location == 'freezer'
      ? storeFreezerList
      : storePantryList;

  const key =
    location == 'refrigerator'
      ? 'refrigerator-key'
      : location == 'freezer'
      ? 'freezer-key'
      : 'pantry-key';

  useEffect(() => {
    if (!list) return;
    if (list.length === 1 && !dataRetrieved) {
      getData();
      setDataRetrieved(true);
      return;
    }
    setDataRetrieved(false);
  }, [list]);

  const storeData = async (date: Date) => {
    let lastID = list && list.length > 0 ? list.at(-1).id : 1;

    if (!freeText) return;

    const newListItem = {
      name: freeText,
      date: new Date().toString(),
      id: lastID + 1,
    };
    list.push(newListItem);
    setFreeText('');
    store(list, 'add');
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue == null) return;
      store(JSON.parse(jsonValue), 'add');
      return jsonValue;
    } catch (e) {
      // error reading value
    }
  };

  const deleteItem = (index: number) => {
    const newList = list.toSpliced(index, 1);
    store(newList, 'delete');
  };

  const _renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <ItemCard
        name={item.name}
        deleteItem={deleteItem}
        index={index}
        date={item.date}
      />
    );
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <Pressable
        style={[styles.additionIcon]}
        onPress={() => addItemRef.current?.present()}
      >
        <AntDesign name='pluscircleo' size={48} color='black' />
      </Pressable>
      <View>
        <FlatList
          data={list}
          keyExtractor={(item, index) => `${item.id}`}
          renderItem={_renderItem}
        />
        <View style={{ height: 100, justifyContent: 'space-around' }}>
          {/* <Button
            title='clear list'
            onPress={() => {
              clearStorage('refrigerator-key');
            }}
          /> */}

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
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
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
  },
});
