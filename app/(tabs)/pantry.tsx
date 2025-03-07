import {
  Button,
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import ItemCard from '../../components/Item';
import { useState, useEffect } from 'react';
import { Item } from '@/types/types';
import { firstItem } from '@/constants/Utils';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { clearStorage } from '@/api/device/storage';

export default function PantryScreen() {
  const [pantryList, setPantryList] = useState<Item[]>([firstItem]);
  const [freeText, setFreeText] = useState<string>('');

  useEffect(() => {
    if (pantryList.length === 1) {
      storeData();
      return;
    }
  }, [pantryList]);

  const storeData = async () => {
    let lastID = pantryList && pantryList.length > 0 ? pantryList.at(-1).id : 1;
    if (!freeText) return;
    const newListItem = {
      name: freeText,
      date: new Date().toString(),
      id: lastID + 1,
    };
    pantryList.push(newListItem);
    setFreeText('');

    try {
      const jsonValue = JSON.stringify(pantryList);
      await AsyncStorage.setItem('pantry-key', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('pantry-key');
      setPantryList(JSON.parse(jsonValue));
      return jsonValue;
    } catch (e) {
      // error reading value
    }
  };

  const _renderItem = ({ item, index }: { item: any; index: number }) => {
    return <ItemCard name={item.name} />;
  };

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
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
            placeholder='e.g rice'
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
          data={pantryList}
          keyExtractor={(item, index) => `${item.id}`}
          renderItem={_renderItem}
        />
        <View style={{ height: 100, justifyContent: 'space-around' }}>
          <Button title='Get Stored list' onPress={() => getData()} />
          <Button
            title='clear list'
            onPress={() => {
              clearStorage('counter-key');
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
