import { Image, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import DerivService from '@/services/DerivService';

export default function HomeScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const derivService = DerivService.getInstance();
      const token = await derivService.getToken();
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const derivService = DerivService.getInstance();
      await derivService.initializeAuth();
      await checkAuthStatus();
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const derivService = DerivService.getInstance();
      await derivService.logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ff444f', dark: '#cc3640' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">AutoDERIV</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.statusContainer}>
        <ThemedText type="subtitle">
          Status: {isLoading ? 'Checking...' : isAuthenticated ? 'Connected' : 'Not Connected'}
        </ThemedText>
        
        <TouchableOpacity
          style={[styles.button, isAuthenticated ? styles.logoutButton : styles.loginButton]}
          onPress={isAuthenticated ? handleLogout : handleLogin}
          disabled={isLoading}
        >
          <ThemedText style={styles.buttonText}>
            {isLoading ? 'Please wait...' : isAuthenticated ? 'Disconnect from Deriv' : 'Connect to Deriv'}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {isAuthenticated && (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Connected to Deriv</ThemedText>
          <ThemedText>
            Your app is now connected to Deriv with App ID: 67655.
            You can start using the trading features.
          </ThemedText>
        </ThemedView>
      )}

      {!isAuthenticated && (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Get Started</ThemedText>
          <ThemedText>
            Connect your Deriv account to start automating your trading journey.
            Make sure you have a Deriv account before proceeding.
          </ThemedText>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusContainer: {
    gap: 16,
    marginVertical: 24,
    alignItems: 'center',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButton: {
    backgroundColor: '#ff444f',
  },
  logoutButton: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
