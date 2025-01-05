import { create } from "zustand";
import useAuthStore from "./useAuthStore"; // Import store z tokenem
import { TrendingPost } from "../types/types";

interface TrendingStore {
  posts: TrendingPost[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  addPost: (title: string, description: string) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  addComment: (postId: string, text: string) => Promise<void>;
}

const API_URL = import.meta.env.VITE_API_URL;

const useTrendingStore = create<TrendingStore>((set) => ({
  posts: [],
  loading: false,
  error: null,

  // Fetch posts from the API
  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/api/posts`);
      const data = await response.json();
      set({ posts: data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch posts", loading: false });
    }
  },

  // Add a new post
  addPost: async (title, description) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/api/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      const newPost = await response.json();
      set((state) => ({ posts: [newPost, ...state.posts], loading: false }));
    } catch (error) {
      set({ error: "Failed to add post", loading: false });
    }
  },

  // Like a post
  likePost: async (postId) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      console.log(token);
      await fetch(`${API_URL}/api/posts/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Dołącz token do nagłówka
        },
      });
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to like post", loading: false });
    }
  },

  // Add a comment to a post
  addComment: async (postId, text) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token; // Pobierz token z useAuthStore
      const response = await fetch(`${API_URL}/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Dołącz token do nagłówka
        },
        body: JSON.stringify({ text }),
      });
      const newComment = await response.json();
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to add comment", loading: false });
    }
  },
}));

export default useTrendingStore;
