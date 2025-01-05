import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const API_URL = import.meta.env.VITE_API_URL;

interface AuthState {
    user: null | { email: string }; // Define your user type here
    token: null | string;
    isAuthenticated: boolean;
    _hasHydrated: boolean; // Add this property
    setHasHydrated: (state: boolean) => void; // Add this method
    login: (email: string, password: string) => Promise<any>;
    register: (email: string, password: string) => Promise<any>;
    logout: () => void;
  }

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      _hasHydrated: false, // Initialize hydration flag
      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }), // Setter for hydration flag
      login: async (email, password) => {
        const response = await fetch(`${API_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          set({ user: data.user, token: data.token, isAuthenticated: true });
        }
        return data;
      },
      register: async (email, password) => {
        const response = await fetch(`${API_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          set({ user: data.user, token: data.token, isAuthenticated: true });
        }
        return data;
      },
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true); // Set hydration flag to true
      },
    }
  )
);

export default useAuthStore;