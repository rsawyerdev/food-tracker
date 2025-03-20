import { Item } from '@/types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Pressable,
  Linking,
} from 'react-native';
import { RecipeList } from '../../constants/RecipeList';

export default function Recipes() {
  const [allItems, setAllItems] = useState();
  const [remainingIngredients, setRemainingIngredients] = useState();
  const [recipeTitle, setRecipeTitle] = useState();
  const [recipeLink, setRecipeLink] = useState();

  const getData = async () => {
    try {
      const freezerValue = await AsyncStorage.getItem('freezer-key').then(
        (freezerJson) => JSON.parse(freezerJson)
      );
      const refrigeratorValue = await AsyncStorage.getItem(
        'refrigerator-key'
      ).then((refrigeratorJson) => JSON.parse(refrigeratorJson));
      const pantryValue = await AsyncStorage.getItem('pantry-key').then(
        (pantryJson) => JSON.parse(pantryJson)
      );
      const counterValue = await AsyncStorage.getItem('counter-key').then(
        (counterJson) => JSON.parse(counterJson)
      );

      const tempAllItems = freezerValue
        .concat(refrigeratorValue)
        .concat(pantryValue)
        .concat(counterValue);
      setAllItems(tempAllItems);
      findItems(tempAllItems);
    } catch (e) {
      // error reading value
    }
  };

  const findItems = (allItems: any) => {
    for (let item of allItems) {
      RecipeList.map((recipe: any) =>
        recipe.ingredients.map((ingredient: string, index: number) => {
          if (item.name == ingredient) {
            recipe.ingredients.splice(index, 1);
            setRecipeLink(recipe.link);
            setRecipeTitle(recipe.title);
            setRemainingIngredients(recipe.ingredients);
          }
        })
      );
    }
  };
  const _renderItem = (item: Item) => {
    // const newItem = item.item.map((i) => console.log('i', i));
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Button title='Get Data' onPress={() => getData()} />
      <View style={styles.recipeBox}>
        <FlatList
          ListHeaderComponent={
            <View>
              <Pressable onPress={() => Linking.openURL(`${recipeLink}`)}>
                <Text style={styles.recipeTitle}>{recipeTitle}</Text>
              </Pressable>
            </View>
          }
          data={remainingIngredients}
          renderItem={(ingredient) => (
            <View>
              <Text>{ingredient.item}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recipeBox: {
    padding: 50,
    alignItems: 'center',
  },
  recipeTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
