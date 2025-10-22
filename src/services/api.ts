/**
 * API service for backend communication
 * Centralizes all API calls and handles authentication headers
 */

const API_BASE_URL = 'https://news-service-802693362877.us-west2.run.app';
const AUTH_BASE_URL = 'https://news-auth-802693362877.us-west2.run.app';

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  username: string; 
  password: string;
}

export interface GoogleAuthRequest {
  id_token: string;
  username?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    username: string;
    name?: string;
  };
  token: string;
}

export interface UserDataResponse {
  user: {
    id: string;
    email: string;
    username: string;
    name?: string;
    sources: Array<{
      name: string;
      url: string;
      description: string;
    }>;
    summary_runs: Array<{
      id: string;
      date_and_time: string;
      summaries: Array<{
        title: string;
        summary: string;
        image: string;
        url: string;
      }>;
    }>;
  };
}

export class ApiService {
  /**
   * Generate headers for API requests
   */
  private static getHeaders(token?: string): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Handle API response and errors
   */
  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      const errorMessage = error.message || error.error || `Request failed with status ${response.status}`;
      
      const apiError = new Error(errorMessage) as any;
      apiError.status = response.status;
      apiError.data = error;
      
      throw apiError;
    }

    return response.json();
  }

  /**
   * Login with email/username and password
   */
  static async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${AUTH_BASE_URL}/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse<AuthResponse>(response);
  }

  /**
   * Register new user with email, username, and password
   */
  static async register(data: SignUpRequest): Promise<AuthResponse> {
    const response = await fetch(`${AUTH_BASE_URL}/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse<AuthResponse>(response);
  }

  /**
   * Login with Google OAuth
   * Expects: { id_token: string }
   */
  static async loginWithGoogle(data: GoogleAuthRequest): Promise<AuthResponse> {
    const response = await fetch(`${AUTH_BASE_URL}/login/google`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ id_token: data.id_token }),
    });

    return this.handleResponse<AuthResponse>(response);
  }

  /**
   * Sign up with Google OAuth
   * Expects: { id_token: string, username: string }
   */
  static async signupWithGoogle(data: GoogleAuthRequest): Promise<AuthResponse> {
    const response = await fetch(`${AUTH_BASE_URL}/signup/google`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ 
        id_token: data.id_token, 
        username: data.username 
      }),
    });

    return this.handleResponse<AuthResponse>(response);
  }

  /**
   * Check username availability
   */
  static async checkUsername(username: string): Promise<{ available: boolean }> {
    const response = await fetch(`${AUTH_BASE_URL}/check-username/${encodeURIComponent(username)}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<{ available: boolean }>(response);
  }

  /**
   * Get user data including sources and summary runs
   */
  static async getUserData(token: string): Promise<UserDataResponse> {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'GET',
      headers: this.getHeaders(token),
    });

    return this.handleResponse<UserDataResponse>(response);
  }

  /**
   * Update user's news sources
   */
  static async updateSources(token: string, sources: Array<{name: string; url: string; description: string}>): Promise<{new_sources: Array<{name: string; url: string; description: string}>}> {
    const response = await fetch(`${API_BASE_URL}/update-sources`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify({ sources }),
    });

    return this.handleResponse<{new_sources: Array<{name: string; url: string; description: string}>}>(response);
  }

  /**
   * Generate news summaries from sources
   */
  static async generateNews(token: string, sources: string[]): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/generate-news`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify({ sources }),
    });

    return this.handleResponse<any>(response);
  }
}
