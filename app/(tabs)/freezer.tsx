import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

import ItemCard from '../../components/Item';
import { useState, useEffect } from 'react';
import { Item } from '@/types/types';


export default function FreezerScreen() {
  const [freezerList, setFreezerList] = useState<Item[]>([
  
  ])
  const [freeText, setFreeText] = useState<string>('')
  const [getNewList, setGetNewList] = useState<boolean>(false)

  useEffect(()=> {
    let lastID =freezerList.length >0? freezerList.at(-1).id : 1
    const newListItem = {name: freeText, date: "2024-11-21", id: lastID+1}
    if(getNewList) {
    freezerList.push(newListItem)
    setGetNewList(false)
    setFreeText('')
    }  
  })

  const _renderItem = ({item, index}: {item: any, index: number}) => {
    return  <ItemCard name={item.name}/>
    
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row'}}>
      <TextInput style={{height: 50, width: 100, backgroundColor: 'pink', marginBottom: 12, paddingLeft: 8}} 
        placeholder='Enter' value={freeText} onChangeText={setFreeText} />
        <Button title='enter' onPress={()=>setGetNewList(true)} disabled={!freeText}/>
      </View>
      <FlatList data={freezerList} keyExtractor={(item, index) =>`${item.id}`} 
      renderItem={ _renderItem } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24
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
