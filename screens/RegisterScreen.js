import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Button, TextInput, Provider as PaperProvider, Snackbar, Card } from 'react-native-paper';
import { useMutation } from 'react-query';
import theme from '../theme';
import axiosInstance from '../services/axiosInstance';


const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [visible, setVisible] = useState(false);

  const registerUser = async (userData) => {
    const response = await axiosInstance.post('/user/register', userData);
    return response.data;
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const mutation = useMutation(registerUser, {
    onSuccess: (data) => {
      navigation.navigate('Verify', {
        email: email,
        phone: phone,
      })
    },
    onError: (error) => {
      setVisible(true);
    },
  });

  const handleRegister = () => {
    let userData = {}

    if (email) {
      userData = {email}
    } else {
      userData = {phone}
    }

    mutation.mutate(userData);
  };
  
  const onDismissSnackBar = () => {
    setVisible(false);
  };

  return (
    <PaperProvider theme={theme}>
      <TouchableWithoutFeedback onPress={handleDismissKeyboard} accessible={false}>
        <SafeAreaView style={styles.container}>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.header}>Create Account</Text>
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                mode="outlined"
                textColor='#fff'
                style={styles.input}
              />
              <View style={styles.separatorContainer}>
                <Text style={styles.separatorText}>Or</Text>
              </View>
              <TextInput
                label="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                autoCapitalize="none"
                mode="outlined"
                textColor='#fff'
                style={styles.input}
              />
              <Button mode="contained" onPress={handleRegister}>
                Register
              </Button>
            </Card.Content>
          </Card>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            duration={Snackbar.DURATION_SHORT}
            action={{
              label: 'Dismiss',
              onPress: () => {
                onDismissSnackBar();
              },
            }}
          >
            Error Logging in
          </Snackbar>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#222',
  },
  card: {
    backgroundColor: '#333',
    margin: 30
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    marginBottom: 16,
  },
  separatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  separatorText: {
    color: '#fff',
  },
});

export default RegisterScreen;