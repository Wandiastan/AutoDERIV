import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DerivService from './services/DerivService';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDerivLogin = async () => {
    setIsLoading(true);
    try {
      const derivService = DerivService.getInstance();
      await derivService.initializeAuth();
      // After successful authentication, you'll be redirected to your callback URL
    } catch (error) {
      console.error('Login error:', error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ff444f', '#ff444f']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to AutoDERIV</Text>
          <Text style={styles.subtitle}>
            Automate your trading journey with Deriv
          </Text>
          
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleDerivLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#ff444f" />
            ) : (
              <Text style={styles.loginButtonText}>Connect with Deriv</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            By connecting, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 40,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: 'white',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#ff444f',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disclaimer: {
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
  },
}); 