import { Button, FlatList, Pressable, StyleSheet, View } from 'react-native';

import ItemCard from '../../components/Item';
import React, { useState, useEffect, useRef } from 'react';
import { Item } from '@/types/types';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearStorage } from '@/api/device/storage';
import { firstItem } from '@/constants/Utils';
import AddItem from '@/components/AddItem';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export default function FreezerScreen() {
  const [freezerList, setFreezerList] = useState<Item[]>([firstItem]);
  const [freeText, setFreeText] = useState<string>('');

  const addItemRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (freezerList.length === 1) {
      storeData();
      return;
    }
  }, [freezerList]);

  const storeData = async () => {
    let lastID =
      freezerList && freezerList.length > 0 ? freezerList.at(-1).id : 1;

    if (!freeText) return;

    const newListItem = {
      name: freeText,
      date: new Date().toString(),
      id: lastID + 1,
    };
    freezerList.push(newListItem);
    setFreeText('');

    try {
      const jsonValue = JSON.stringify(freezerList);
      await AsyncStorage.setItem('freezer-key', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('freezer-key');
      setFreezerList(JSON.parse(jsonValue));
      return jsonValue;
    } catch (e) {
      // error reading value
    }
  };

  const _renderItem = ({ item, index }: { item: any; index: number }) => {
    return <ItemCard name={item.name} />;
  };

  return (
    <Pressable style={styles.container}>
      <View>
        <FlatList
          data={freezerList}
          keyExtractor={(item, index) => `${item.id}`}
          renderItem={_renderItem}
        />
        <View style={{ height: 100, justifyContent: 'space-around' }}>
          <Button title='Get Stored list' onPress={() => getData()} />
          <Button
            title='clear list'
            onPress={() => {
              clearStorage('freezer-key');
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
