import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

const AppHeader = () => {
  const navigation = useNavigation();
  const { setIsAuthenticated } = useAuth();

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('authToken');
    setIsAuthenticated(false);  
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>App Name</Text>
        </View>
        <View style={styles.actionArea}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#1c313a',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  actionArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#4dabf7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  logoutText: {
    fontSize: 16,
    color: 'white',
  },
});

export default AppHeader;