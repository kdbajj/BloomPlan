import axios from 'axios';

// Funkcja rejestracji
export const register = async (email: string, password: string) => {
  try {
    const response = await axios.post('/api/register', { email, password });
    return response.data; // { message: 'User registered successfully' }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Jeśli to błąd Axios, sprawdzamy response
      throw new Error(error.response?.data?.message || 'Registration failed');
    } else {
      // Obsługuje inne błędy, które nie są Axios
      throw new Error('An unexpected error occurred during registration');
    }
  }
};

// Funkcja logowania
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post('/api/login', { email, password });
    localStorage.setItem('authToken', response.data.token);  // Zapisanie tokena
    return response.data; // { message: 'Logged in successfully', token: 'xyz' }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Jeśli to błąd Axios, sprawdzamy response
      throw new Error(error.response?.data?.message || 'Login failed');
    } else {
      // Obsługuje inne błędy
      throw new Error('An unexpected error occurred during login');
    }
  }
};
