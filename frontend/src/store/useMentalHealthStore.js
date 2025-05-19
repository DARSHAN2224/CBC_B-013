import { create } from "zustand";
import axios from "axios";
// http://localhost:3000/api/predic
const API_URL =
  import.meta.env.MODE === "development"? "http://localhost:8000/api/users"
    : "/api/users";

export const useMentalStore = create((set, get) => ({
  inputData: {
    sleep_hours: 7,
    screen_time: 5,
    stress_level: 5,
    physical_activity: 3,
    social_interaction: 4,
  },
  questions: [],
  answers: [],
  prediction: "",
  suggestions: "",
  recommendations: null,
  isLoading: false,
  error: null,

  // Set individual input values
  setInputValue: (key, value) =>
    set((state) => ({
      inputData: {
        ...state.inputData,
        [key]: value,
      },
    })),

  // Set individual answers
  setAnswer: (index, value) =>
    set((state) => {
      const updated = [...state.answers];
      updated[index] = value;
      return { answers: updated };
    }),

  // Predict using inputData
  predict: async (inputData) => {
    set({ isLoading: true, error: null });
    console.log(inputData);
        console.log(API_URL);

    try {
      const res = await axios.post(`${API_URL}/predict`, inputData);
          console.log(res);

      set({
        prediction: res.data.data.prediction,
        questions: res.data.data.questions || [],
        isLoading: false,
      });
      console.log(prediction);
      
    } catch (error) {
      const msg = extractError(error);
      set({ error: msg, isLoading: false });
    }
  },

  storeAnswers: async (user_id, answers) => {
        console.log(user_id,answers);

    set({ isLoading: true, error: null });
    try {
    const res=  await axios.post(`${API_URL}/store-answers`, { user_id, answers });
    console.log(res);
    
      set({ isLoading: false });
    } catch (error) {
      const msg = extractError(error);
      set({ error: msg, isLoading: false });
    }
  },

  generateSuggestions: async (user_id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/generate-suggestions`, { user_id });
      set({ suggestions: res.data.data.suggestions, isLoading: false });
    } catch (error) {
      const msg = extractError(error);
      set({ error: msg, isLoading: false });
    }
  },

  fetchRecommendations: async (user_id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/recommend-personal-habits`, { user_id });
      set({ recommendations: res.data.data.suggestion, isLoading: false });
    } catch (error) {
      const msg = extractError(error);
      set({ error: msg, isLoading: false });
    }
  },

  clearMentalData: () =>
    set({
      inputData: {},
      questions: [],
      answers: [],
      prediction: null,
      suggestions: "",
      recommendations: null,
      error: null,
      isLoading: false,
    }),
}));

function extractError(error) {
  return error?.response?.data.data?.message || error?.message || "Something went wrong";
}
let refreshPromise = null;

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Use an ongoing refresh if available
                if (!refreshPromise) {
                    refreshPromise = useAuthStore.getState().refreshToken();
                }

                await refreshPromise;
                refreshPromise = null;

                // Retry the original request
                return axios(originalRequest);
            } catch (refreshError) {
                refreshPromise = null;
                useAuthStore.getState().logout();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
