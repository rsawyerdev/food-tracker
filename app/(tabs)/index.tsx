import {
  Button,
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import ItemCard from '../../components/Item';
import { useState, useEffect } from 'react';
import { Item } from '@/types/types';
import { clearStorage } from '../../api/device/storage';
import { firstItem } from '@/constants/Utils';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export default function RefrigeratorScreen() {
  const [refrigeratorList, setRefrigeratorList] = useState<Item[]>([firstItem]);
  const [freeText, setFreeText] = useState<string>('');

  useEffect(() => {
    if (refrigeratorList.length === 1) {
      storeData();
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
    try {
      const jsonValue: string = JSON.stringify(refrigeratorList);
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

  const _renderItem = ({ item, index }: { item: any; index: number }) => {
    return <ItemCard name={item.name} />;
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <View>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={{
              height: 50,
              width: 100,
              backgroundColor: 'pink',
              marginBottom: 12,
              paddingLeft: 8,
            }}
            placeholder='e.g. milk'
            value={freeText}
            onChangeText={setFreeText}
            enablesReturnKeyAutomatically
            onSubmitEditing={() => storeData()}
          />
          <Button
            title='enter'
            onPress={() => storeData()}
            disabled={!freeText}
          />
        </View>
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
