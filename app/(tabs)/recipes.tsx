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
  const [remainingIngredients, setRemainingIngredients] = useState<string[]>(
    []
  );
  const [recipeTitle, setRecipeTitle] = useState<string>('');
  const [recipeLink, setRecipeLink] = useState<string>('');
  const [recipeOpen, setRecipeOpen] = useState<boolean>(false);

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

  const findItems = (allItems: any, title?: string) => {
    for (let item of allItems) {
      RecipeList.map((recipes: any) => {
        for (let recipe of RecipeList) {
          if (recipe.title == title) {
            recipe.ingredients.map((ingredient: string, index: number) => {
              if (item.name == ingredient) {
                recipe.ingredients.splice(index, 1);
                setRecipeLink(recipe.link);
                setRecipeTitle(recipe.title);
                setRemainingIngredients(recipe.ingredients);
                setRecipeOpen(true);
              }
            });
          }
        }
      });
    }
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
            <Pressable onPress={() => findItems(allItems, ingredient.item)}>
              <Text>{ingredient.item}</Text>
            </Pressable>
          )}
          ListFooterComponent={
            <View style={{ marginTop: 20 }}>
              {RecipeList.map((recipe) => (
                <Pressable onPress={() => findItems(allItems, recipe.title)}>
                  <Text>{recipe.title}</Text>
                </Pressable>
              ))}
            </View>
          }
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
