import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import AddRecipeModal from '../../components/AddRecipeModal';
import { Button } from '@/components/Button';

export default function Recipes() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title='Add Recipe'
        onButtonPress={() => setModalVisible(true)}
        textColor='#F3F3E0'
        backgroundColor='#27548A'
      />
      <AddRecipeModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3E0',
  },
});
