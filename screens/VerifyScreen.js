import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useMutation } from 'react-query';
import apiClient from '../services/axiosInstance';
import { useRoute } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

export default function VerifyScreen() {
  const [verificationToken, setVerificationToken] = useState('');

  const route = useRoute();
  const { email, phone } = route.params;

  const verifyUser = async (data) => {
    const response = await apiClient.post('/user/verify-token', data);
    return response.data;
  };

  const verifyMutation = useMutation(verifyUser, {
    onSuccess: async (data) => {
      await SecureStore.setItemAsync('authToken', data.token);
      // Navigate to the next screen or update the app state
    },
    onError: (error) => {
      
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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Verify Code</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginBottom: 20,
          paddingLeft: 10,
        }}
        onChangeText={setVerificationToken}
        value={verificationToken}
        keyboardType="numeric"
        placeholder="Enter Verification Code"
      />
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 5,
        }}
        onPress={handleVerify}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}