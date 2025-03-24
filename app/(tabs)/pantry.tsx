import {
  Button,
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from 'react-native';

import ItemCard from '../../components/Item';
import { useState, useEffect, useRef } from 'react';
import { Item } from '@/types/types';
import { firstItem } from '@/constants/Utils';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { clearStorage } from '@/api/device/storage';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import AddItem from '@/components/AddItem';
import { AntDesign } from '@expo/vector-icons';

export default function PantryScreen() {
  const [pantryList, setPantryList] = useState<Item[]>([]);
  const [freeText, setFreeText] = useState<string>('');

  const addItemRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (pantryList.length === 0 || !pantryList) {
      getData();
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
    return <ItemCard item={item} />;
  };

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior='padding'>
        <FlatList
          data={pantryList}
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
            getData={getData}
            freeText={freeText}
            setFreeText={setFreeText}
          />
        </View>
        <Pressable
          style={[styles.additionIcon]}
          onPress={() => addItemRef.current?.present()}
        >
          <AntDesign name='pluscircleo' size={48} color='black' />
        </Pressable>
      </KeyboardAvoidingView>
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
