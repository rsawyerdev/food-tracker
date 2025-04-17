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
import AddItem from '@/components/AddItem';
import AntDesign from '@expo/vector-icons/AntDesign';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { firstItem } from '@/constants/Utils';
import { useStorage } from '@/api/context/storageState';

export default function RefrigeratorScreen() {
  const { setFreeText, freeText, refrigeratorList, storeRefrigeratorList } =
    useStorage();
  const [dataRetrieved, setDataRetrieved] = useState<boolean>(false);

  const addItemRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (!refrigeratorList) return;
    if (refrigeratorList.length === 1 && !dataRetrieved) {
      getData();
      setDataRetrieved(true);
      return;
    }
  }, [refrigeratorList]);

  const storeData = async () => {
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
    storeRefrigeratorList(refrigeratorList, 'add');
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('refrigerator-key');
      if (jsonValue == null) return;
      storeRefrigeratorList(JSON.parse(jsonValue), 'add');
      return jsonValue;
    } catch (e) {
      // error reading value
    }
  };

  const deleteItem = (index: number) => {
    const newList = refrigeratorList.toSpliced(index, 1);
    storeRefrigeratorList(newList, 'delete');
  };

  const _renderItem = ({ item, index }: { item: any; index: number }) => {
    return <ItemCard name={item.name} deleteItem={deleteItem} index={index} />;
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
          data={refrigeratorList}
          keyExtractor={(item, index) => `${item.id}`}
          renderItem={_renderItem}
        />
        <View style={{ height: 100, justifyContent: 'space-around' }}>
          <Button
            title='clear list'
            onPress={() => {
              clearStorage('refrigerator-key');
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
