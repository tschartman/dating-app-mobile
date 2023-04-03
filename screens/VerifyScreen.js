import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Alert, TouchableWithoutFeedback } from 'react-native';
import { Button, TextInput, Provider as PaperProvider, Snackbar, Card } from 'react-native-paper';

import { useMutation } from 'react-query';
import apiClient from '../services/axiosInstance';
import { useRoute } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../context/AuthContext';

import theme from '../theme';

export default function VerifyScreen({navigation}) {
  const [verificationToken, setVerificationToken] = useState('');
  const [visible, setVisible] = useState(false);
  const { setIsAuthenticated } = useAuth();

  const route = useRoute();
  const { email, phone } = route.params;
  
  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const verifyUser = async (data) => {
    const response = await apiClient.post('/user/verify-token', data);
    return response.data;
  };

  const verifyMutation = useMutation(verifyUser, {
    onSuccess: async (data) => {
      await SecureStore.setItemAsync('authToken', data.token);
      setIsAuthenticated(true)
    },
    onError: (error) => {
      setVisible(true);
    },
  });

  const handleVerify = () => {
    let userData = {}

    if (email) {
      userData = {email, verificationToken}
    } else {
      userData = {phone, verificationToken}
    }

    if (verificationToken) {
      verifyMutation.mutate(userData);
    } else {
      Alert.alert('Error', 'Please enter the verification code');
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
            <Card.Content>
              <Text style={styles.header}>Verify Code</Text>
              <TextInput
                style={styles.input}
                onChangeText={setVerificationToken}
                value={verificationToken}
                keyboardType="numeric"
                placeholder="Enter Verification Code"
              />
              <Button mode="contained" onPress={handleVerify}>
                Verify
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
            Error Verifying Code
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