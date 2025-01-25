import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';

export interface DerivAuthConfig {
  app_id: string;
  scope?: string[];
}

export interface DerivTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
}

class DerivService {
  private static instance: DerivService;
  private config: DerivAuthConfig = {
    app_id: '67655',
    scope: [
      'read',
      'trade',
      'trading_information',
      'payments',
      'admin',
    ],
  };

  private constructor() {}

  public static getInstance(): DerivService {
    if (!DerivService.instance) {
      DerivService.instance = new DerivService();
    }
    return DerivService.instance;
  }

  private getRedirectUrl(): string {
    // Using Render.com domain for both development and production
    return 'https://autodrv-oauth.onrender.com/oauth/callback';
  }

  public async initializeAuth(): Promise<void> {
    const params = new URLSearchParams({
      app_id: this.config.app_id,
      l: 'en',
      brand: 'deriv',
      date_first_contact: new Date().toISOString(),
      signup_device: 'mobile',
      redirect_uri: this.getRedirectUrl(),
    });

    const authUrl = `https://oauth.deriv.com/oauth2/authorize?${params.toString()}`;
    
    try {
      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        this.getRedirectUrl()
      );
      
      if (result.type === 'success' && result.url) {
        // Extract token from the URL
        const token = result.url.split('token=')[1];
        if (token) {
          await this.saveToken(token);
          return;
        }
      }
      throw new Error('Authentication failed');
    } catch (error) {
      console.error('Auth error:', error);
      throw error;
    }
  }

  private async saveToken(token: string): Promise<void> {
    await AsyncStorage.setItem('deriv_token', token);
  }

  public async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem('deriv_token');
  }

  public async logout(): Promise<void> {
    await AsyncStorage.removeItem('deriv_token');
  }
}

export default DerivService; 