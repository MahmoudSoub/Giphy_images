import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '../store/isSignedIn';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleSignIn = () => {
    if (email === '' && password === '') {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }
    dispatch(login());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Sign In </Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />
      </View>
      <View style={styles.button}>
        <Button title="Sign In" onPress={handleSignIn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    width: '80%',
  },
  button: {
    padding: 10,
  },
});

export default Signin;
