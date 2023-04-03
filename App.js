import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from 'react-query';
import queryClient from './queryClient';
import AuthenticatedStack from './navigation/AuthenticatedStack';
import UnauthenticatedStack from './navigation/UnauthenticatedStack';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedStack /> : <UnauthenticatedStack />}
    </NavigationContainer>
  );
}

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;