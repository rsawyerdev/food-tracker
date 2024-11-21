import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

import ItemCard from '../../components/Item';
import { useState } from 'react';

export default function FreezerScreen() {
  const [freezerList, setFreezerList] = useState([
    { name: 'marinated chicken', date: '2023-12-28', id: 1 },
    { name: 'bread', date: '2023-12-27', id: 2 },
    { name: 'chicken nuggets', date: '2023-12-26', id: 4 },
  ])


  const _renderItem = ({item, index}: {item: any, index: any}) => {
    return  <ItemCard name={item.name}/>
    
  };

  return (
    <View style={styles.container}>
      <TextInput style={{height: 50, width: 100, backgroundColor: 'pink', marginBottom: 12, paddingLeft: 8}} placeholder='Enter'/>
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
