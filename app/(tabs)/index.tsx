import {
  Button,
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import ItemCard from '../../components/Item';
import { useState, useEffect, useRef } from 'react';
import { Item } from '@/types/types';
import { clearStorage } from '../../api/device/storage';
import { firstItem } from '@/constants/Utils';
import AddItem from '@/components/AddItem';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export default function RefrigeratorScreen() {
  const [refrigeratorList, setRefrigeratorList] = useState<Item[]>([firstItem]);
  const [freeText, setFreeText] = useState<string>('');

  const addItemRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (refrigeratorList == null) return;
    if (refrigeratorList.length === 1) {
      storeData('add');
      return;
    }
  }, [refrigeratorList]);

  const storeData = async (action: string, list?: [Item]) => {
    console.log('list', list);
    if (action == 'add') {
      let lastID =
        refrigeratorList && refrigeratorList.length > 0
          ? refrigeratorList.at(-1).id
          : 1;

      if (!freeText) return;

      const newListItem = {
        name: freeText,
        date: new Date().toString(),
        id: lastID + 1,
      };
      refrigeratorList.push(newListItem);
      setFreeText('');
    }
    try {
      const jsonValue: string = JSON.stringify(
        action == 'add' ? refrigeratorList : list
      );
      await AsyncStorage.setItem('refrigerator-key', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue: string = await AsyncStorage.getItem('refrigerator-key');
      setRefrigeratorList(JSON.parse(jsonValue));
      return jsonValue;
    } catch (e) {
      // error reading value
    }
  };

  const deleteItem = (item: Item, index: number) => {
    const newList = refrigeratorList.toSpliced(index, 1);
    setRefrigeratorList(refrigeratorList.toSpliced(index, 1));
    storeData('delete', newList);
  };

  const _renderItem = ({ item, index }: { item: any; index: number }) => {
    return <ItemCard item={item} deleteItem={deleteItem} index={index} />;
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <View>
        <FlatList
          data={refrigeratorList}
          keyExtractor={(item, index) => `${item.id}`}
          renderItem={_renderItem}
        />
        <View style={{ height: 100, justifyContent: 'space-around' }}>
          <Button title='Get Stored list' onPress={() => getData()} />
          <Button
            title='clear list'
            onPress={() => {
              clearStorage('refrigerator-key');
            }}
          />
          <Button
            title='Add Item'
            onPress={() => addItemRef.current?.present()}
          />
          <AddItem
            ref={addItemRef}
            storeData={storeData}
            freeText={freeText}
            setFreeText={setFreeText}
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
});
