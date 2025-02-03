import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import ItemCard from '../../components/Item';
import { useState, useEffect } from 'react';
import { Item } from '@/types/types';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RefrigeratorScreen() {
  const [refrigeratorList, setRefrigeratorList] = useState<Item[]>([]);
  const [freeText, setFreeText] = useState<string>('');
  const [getNewList, setGetNewList] = useState<boolean>(false);

  useEffect(() => {
    getData();
    let lastID =
      refrigeratorList && refrigeratorList.length > 0
        ? refrigeratorList.at(-1).id
        : 1;

    const newListItem = {
      name: freeText,
      date: new Date().toString(),
      id: lastID + 1,
    };
    if (getNewList) {
      refrigeratorList.push(newListItem);
      setGetNewList(false);
      setFreeText('');
      storeData();
    }
  }, [refrigeratorList, getNewList]);

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(refrigeratorList);
      await AsyncStorage.setItem('refrigerator-key', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    if (refrigeratorList.length !== null) return null;
    if (refrigeratorList.length > 0) return null;
    try {
      const jsonValue = await AsyncStorage.getItem(`refrigerator-key`);
      setRefrigeratorList(JSON.parse(jsonValue));
      return jsonValue;
    } catch (e) {
      // error reading value
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('refrigerator-key');
    } catch (e) {
      // remove error
    }

    console.log('Done.');
  };

  const _renderItem = ({ item, index }: { item: any; index: number }) => {
    return <ItemCard name={item.name} />;
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={{
            height: 50,
            width: 100,
            backgroundColor: 'pink',
            marginBottom: 12,
            paddingLeft: 8,
          }}
          placeholder='Enter'
          value={freeText}
          onChangeText={setFreeText}
        />
        <Button
          title='enter'
          onPress={() => setGetNewList(true)}
          disabled={!freeText}
        />
      </View>
      <FlatList
        data={refrigeratorList}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={_renderItem}
      />
      <Button title='remove item' onPress={() => removeValue()} />
    </View>
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
