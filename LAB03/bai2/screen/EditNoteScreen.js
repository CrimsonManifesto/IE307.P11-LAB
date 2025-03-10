import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { updateNote } from '../database/notesService';
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SettingsContext } from '../context/SettingsContext';

 
export default function EditNoteScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id, currentTitle, currentContent } = route.params;
  const { isDarkMode } = useContext(SettingsContext);
  const [title, setTitle] = useState(currentTitle);
  const [content, setContent] = useState(currentContent);

  const handleUpdateNote = () => {
    if (!title) {
      Alert.alert('Warning', 'Please enter a title!');
      return;
    }
    updateNote(id, title, content, () => {
      navigation.goBack();
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: isDarkMode ? '#333' : '#F2F4F7',
      },
      headerTintColor: isDarkMode ? 'white' : '#000',
    });
  }, [isDarkMode]);


  return (
    <View style={[styles.body, { backgroundColor: isDarkMode ? '#111111' : '#F2F4F7' }]}>
      <View style={styles.container}>
        <TextInput
          placeholder="Enter your title"
          placeholderTextColor={isDarkMode ? '#BBBBBB' : '#727272'}
          value={title}
          onChangeText={setTitle}
          style={[styles.noteTitle, { color: isDarkMode ? 'white' : '#727272' }]}
        />
        <TextInput
          placeholder="Enter your note"
          placeholderTextColor={isDarkMode ? '#BBBBBB' : '#727272'}
          value={content}
          onChangeText={setContent}
          style={[styles.noteText, { color: isDarkMode ? 'white' : '#727272' }]}
          multiline={true}
        />
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={handleUpdateNote}>
            <Ionicons name="checkmark-circle" size={50} color="green" />
          </TouchableOpacity>
          <TouchableOpacity onPress={navigation.goBack}>
            <Octicons name="x-circle-fill" size={43} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  noteTitle: {
    height: 50,
    borderColor: '#727272',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 20,
    borderRadius: 5,
  },
  noteText: {
    height: 100,
    borderColor: '#727272',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 20,
    borderRadius: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
  }
});
