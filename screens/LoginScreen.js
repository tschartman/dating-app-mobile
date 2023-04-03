import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { Button, TextInput, Provider as PaperProvider, Snackbar, Card } from 'react-native-paper';
import { useMutation } from 'react-query';
import theme from '../theme';
import apiClient from '../services/axiosInstance';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
  },
  card: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: theme.colors.cardBackground,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: theme.colors.text
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },

});

const loginUser = async (data) => {
  const response = await apiClient.post('/user/login', data);
  return response.data;
};

const LoginScreen = () => {
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const loginMutation = useMutation(loginUser, {
    onSuccess: async (data) => {
      navigation.navigate('Verify', {
        email: email,
        phone: phone,
      })
    },
    onError: (error) => {
      setVisible(true);
    },
  });

  const handleLogin = () => {
    if (email || phone) {
      loginMutation.mutate({ email, phone });
    } else {
      Alert.alert('Error', 'Please enter your email or phone number');
    }
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  return (
      <PaperProvider theme={theme}>
        <TouchableWithoutFeedback onPress={handleDismissKeyboard} accessible={false}>
          <SafeAreaView style={styles.container}>
            <Card style={styles.card}>
              <Text style={styles.title}>Already have an account?</Text>
              <Text style={styles.title}>Sign In</Text>
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                textColor='#fff'
                mode="outlined"
              />
              <Text style={styles.title}>Or</Text>
              <TextInput
                label="Phone Number"
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
                autoCapitalize="none"
                textColor='#fff'
                mode="outlined"
                keyboardType="phone-pad"
              />
              <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.button}
              >
                Sign In
              </Button>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('Register')}
                style={styles.button}
              >
                Register
              </Button>
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
};

export default LoginScreen;