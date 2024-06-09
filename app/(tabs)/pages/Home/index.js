import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import Checkbox from 'expo-checkbox';
import Slider from '@react-native-community/slider';
import { ModalPassword } from '../../modal';

const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const num = '0123456789';
const mark = ',.!?';

export function Home() {
  const [size, setSize] = useState(4);
  const [passwordValue, setPasswordValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNums, setIncludeNums] = useState(true);
  const [includeMarks, setIncludeMarks] = useState(true);

  function generatePassword() {
    let selectedCharset = '';
    if (includeLowercase) selectedCharset += lowercase;
    if (includeUppercase) selectedCharset += uppercase;
    if (includeNums) selectedCharset += num;
    if (includeMarks) selectedCharset += mark;

    if (selectedCharset.length === 0) return;

    let password = '';
    for (let i = 0, n = selectedCharset.length; i < size; i++) {
      password += selectedCharset.charAt(Math.floor(Math.random() * n));
    }
    setPasswordValue(password);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../src/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>{size} caracteres</Text>
      <View style={styles.area}>
        <Slider
          style={{ height: 50 }}
          minimumValue={4}
          maximumValue={26}
          maximumTrackTintColor='#e9cd3c'
          minimumTrackTintColor='#f39b37'
          thumbTintColor='#4134e3'
          value={size}
          onValueChange={(value) => setSize(parseInt(value.toFixed(0)))}
        />
      </View>
      <View style={styles.containerSel}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={includeLowercase}
            onValueChange={setIncludeLowercase}
            color={includeLowercase ? '#4134e3' : undefined}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Letras minúsculas</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={includeUppercase}
            onValueChange={setIncludeUppercase}
            color={includeUppercase ? '#4134e3' : undefined}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Letras maiúsculas</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={includeNums}
            onValueChange={setIncludeNums}
            color={includeNums ? '#4134e3' : undefined}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Números</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={includeMarks}
            onValueChange={setIncludeMarks}
            color={includeMarks ? '#4134e3' : undefined}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Símbolos</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>Gerar Senha</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType='fade' transparent={true}>
        <ModalPassword password={passwordValue} handleClose={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0fc',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    margin: 20,
    resizeMode: 'contain',
    height: 200
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  area: {
    marginTop: 15,
    marginBottom: 15,
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 6
  },
  containerSel: {
    justifyContent: 'flex-start',
    margin: 15,
    backgroundColor: '#FFF',
    borderRadius: 8
  },
  checkboxContainer: {
    flexDirection: 'row',
    margin: 10
  },
  checkbox: {
    alignSelf: 'center',
    justifyContent: 'flex-start'
  },
  label: {
    margin: 8
  },
  button: {
    backgroundColor: '#4134e3',
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 20
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20
  }
});
