import { Button } from '@/components/Button';
import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  TextInput,
  useWindowDimensions,
} from 'react-native';

export default function RecipeModal(props: any) {
  const { modalVisible, setModalVisible } = props;
  const { width } = useWindowDimensions();

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Pressable
        style={styles.container}
        onPress={() => setModalVisible(false)}
      >
        <View style={[styles.contentContainer]}>
          <TextInput
            placeholder='Recipe Name'
            placeholderTextColor='rgba(24, 59, 78, .5)'
            style={[styles.textInput, { minWidth: width / 1.7 }]}
          />
          <TextInput
            placeholder='Recipe description'
            placeholderTextColor='rgba(24, 59, 78, .5)'
            style={[styles.textInput, { height: 100, minWidth: width / 1.7 }]}
            multiline
          />
          <View style={styles.buttonContainer}>
            <Button
              title='Add'
              onButtonPress={() => console.log('press')}
              textColor='#F3F3E0'
              backgroundColor='#27548A'
              styleProps={{ marginTop: 12, marginRight: 4 }}
            />
            <Button
              title='Cancel'
              onButtonPress={() => setModalVisible(false)}
              textColor='#F3F3E0'
              backgroundColor='#DDA853'
              styleProps={{ marginTop: 12 }}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(24, 59, 78, .7)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#F3F3E0',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textInput: {
    backgroundColor: '#F3F3E0',
    borderWidth: 1,
    borderColor: 'rgba(24, 59, 78, .1)',
    padding: 12,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
