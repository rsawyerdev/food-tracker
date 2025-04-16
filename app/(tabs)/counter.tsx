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
import { firstItem } from '@/constants/Utils';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { clearStorage } from '@/api/device/storage';
import AddItem from '@/components/AddItem';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { AntDesign } from '@expo/vector-icons';
import { useStorage } from '@/api/context/storageState';

export default function CounterScreen() {
  const { storeCounterList, freeText, setFreeText, counterList } = useStorage();

  const addItemRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (!counterList) return;
    if (counterList.length === 1) {
      getData();
      return;
    }
  }, [counterList]);

  const storeData = async (action: string, list?: Item[]) => {
    if (action == 'add') {
      let lastID =
        counterList && counterList.length > 0 ? counterList.at(-1).id : 1;
      if (!freeText) return;
      const newListItem = {
        name: freeText,
        date: new Date().toString(),
        id: lastID + 1,
      };
      counterList.push(newListItem);
      setFreeText('');
    }
    storeCounterList(counterList);
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('counter-key');
      if (jsonValue == null) return;
      storeCounterList(JSON.parse(jsonValue));
      return jsonValue;
    } catch (e) {
      // error reading value
    }
  };

  const deleteItem = (item: Item, index: number) => {
    const newList = counterList.toSpliced(index, 1);
    storeCounterList(newList);
    storeData('delete', newList);
  };

  const _renderItem = ({ item, index }: { item: any; index: number }) => {
    return <ItemCard item={item} deleteItem={deleteItem} index={index} />;
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
          data={counterList}
          keyExtractor={(item, index) => `${item.id}`}
          renderItem={_renderItem}
        />
        <View style={{ height: 100, justifyContent: 'space-around' }}>
          <Button
            title='clear list'
            onPress={() => {
              clearStorage('counter-key');
            }}
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
