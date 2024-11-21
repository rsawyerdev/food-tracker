import { StyleSheet, TextInput,View, Button, Text, Pressable, ScrollView, FlatList } from 'react-native';
import ItemCard from '@/components/Item';


export default function PantryScreen() {

  const items = [
    { name: 'chickpeas', date: '2023-12-28', id: 1 },
    { name: 'rice pilaf', date: '2023-12-27', id: 2 },
    { name: 'granola', date: '2023-12-28', id: 3 },
    { name: 'bread crumbs', date: '2023-12-26', id: 4 },
  ]

  const _renderItem = ({item, index}: {item: any, index: any}) => {
    return <ItemCard name={item.name}/>;
  };

  return (
    <View style={styles.container}>
      <FlatList data={items} keyExtractor={(item, index) =>`${item.id}`} renderItem={_renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
