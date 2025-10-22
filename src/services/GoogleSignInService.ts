/**
 * Google Sign-In service for React Native
 * Handles Google OAuth authentication and returns ID tokens
 */

import { GoogleSignin } from '@react-native-google-signin/google-signin';

export interface GoogleUserInfo {
  idToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    photo?: string;
  };
}

export class GoogleSignInService {
  /**
   * Initialize Google Sign-In with configuration
   */
  static initialize(): void {
    GoogleSignin.configure({
      webClientId: '802693362877-2ad452kd7mmm9jlgje6aigfunsb3065g.apps.googleusercontent.com', // Keep the ORIGINAL web client ID
      offlineAccess: true,
    });
  }

  /**
   * Check if Google Play Services are available
   */
  static async hasPlayServices(): Promise<boolean> {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      return true;
    } catch (error) {
      console.error('Google Play Services not available:', error);
      return false;
    }
  }

  /**
   * Sign in with Google and get user info with ID token
   */
  static async signIn(): Promise<GoogleUserInfo> {
    try {
      // Check if Google Play Services are available
      await this.hasPlayServices();

      // Sign out first to force account selection popup
      await GoogleSignin.signOut();

      // Get user info
      const userInfo = await GoogleSignin.signIn();
      
      // Get ID token
      const tokens = await GoogleSignin.getTokens();
      
      if (!tokens.idToken) {
        throw new Error('Failed to get Google ID token');
      }

      return {
        idToken: tokens.idToken,
        user: {
          id: (userInfo as any).user?.id || '',
          name: (userInfo as any).user?.name || '',
          email: (userInfo as any).user?.email || '',
          photo: (userInfo as any).user?.photo || undefined,
        },
      };
    } catch (error: any) {
      console.error('Google Sign-In error:', error);
      
      // Handle specific Google Sign-In errors
      if (error.code === 'SIGN_IN_CANCELLED') {
        throw new Error('Google Sign-In was cancelled');
      } else if (error.code === 'IN_PROGRESS') {
        throw new Error('Google Sign-In is already in progress');
      } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
        throw new Error('Google Play Services not available');
      } else {
        throw new Error('Google Sign-In failed. Please try again.');
      }
    }
  }

  /**
   * Sign out from Google
   */
  static async signOut(): Promise<void> {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error('Google Sign-Out error:', error);
    }
  }

  /**
   * Check if user is currently signed in to Google
   */
  static async isSignedIn(): Promise<boolean> {
    try {
      const userInfo = await GoogleSignin.getCurrentUser();
      return userInfo !== null;
    } catch (error) {
      console.error('Error checking Google Sign-In status:', error);
      return false;
    }
  }

  /**
   * Get current user info if signed in
   */
  static async getCurrentUser(): Promise<GoogleUserInfo | null> {
    try {
      const userInfo = await GoogleSignin.getCurrentUser();
      if (!userInfo) return null;

      const tokens = await GoogleSignin.getTokens();
      if (!tokens.idToken) return null;

      return {
        idToken: tokens.idToken,
        user: {
          id: (userInfo as any).user?.id || '',
          name: (userInfo as any).user?.name || '',
          email: (userInfo as any).user?.email || '',
          photo: (userInfo as any).user?.photo || undefined,
        },
      };
    } catch (error) {
      console.error('Error getting current Google user:', error);
      return null;
    }
  }
}
