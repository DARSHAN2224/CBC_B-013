import { create } from "zustand";
import axios from "axios"
const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8000/api/users" : "/api/users";

axios.defaults.withCredentials = true;



export const useAuthStore = create((set,get) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

   signup: async (email, password, name, mobile) => {
    set({ isLoading: true, error: null });
    try {
        const response = await axios.post(`${API_URL}/signup`, {
            email,
            password,
            name,
            mobile,
        });
        set({ user: response.data.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
        let errorMessage = errors(error);
        set({ error: errorMessage || "Error signing up", isLoading: false });
        throw error;
    }
}
,
    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            console.log(response.data.data);
            console.log(response);
            
            set({
                isAuthenticated: true,
                user: response.data.data,
                error: null,
                isLoading: false,
            });
        } catch (error) {
            let errorMessage = errors(error);
            console.log(errorMessage);

            set({ error: errorMessage || "Error logging in", isLoading: false });
            throw error;
        }
    },logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
            let errorMessage = errors(error);
            console.log(errorMessage);

            set({ error: errorMessage || "Error logging out", isLoading: false });
            throw error;
			
		}
	},
     refreshToken: async () => {
        // Prevent multiple simultaneous refresh attempts
        if (get().isCheckingAuth) return;

        set({ isCheckingAuth: true });
        try {
            const response = await axios.post(`${API_URL}/refresh-token`);
            set({ isCheckingAuth: false });
            console.log(response+" jj");
            
            return response.data.accessToken;
        } catch (error) {
            let errorMessage = errors(error);
            console.log(errorMessage);
            set({error: errorMessage,user: null, isCheckingAuth: false });

            throw error;
        }
    }, checkAuth: async () => {
        set({ isCheckingAuth: true , error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            console.log(response);

            set({ user: response.data.data.user, isCheckingAuth: false ,isAuthenticated: true});
        } catch (error) {
            // let errorMessage = errors(error);
            // console.log(error);

            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
            throw error

        }
    },forgotPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/forgot-password`, { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
            let errorMessage = errors(error);
            console.log(errorMessage);

            set({ error: errorMessage || "Error sending reset password email", isLoading: false });
            throw error;
		
		}
	},
	resetPassword: async (token, password,confirmPassword) => {
		set({ isLoading: true, error: null });
        if (password !== confirmPassword) {
			set({ loading: false });
			return toast.error("Passwords do not match");
		}
		try {
			const response = await axios.post(`${API_URL}/reset-password/${token}`, { password,confirmPassword });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
            let errorMessage = errors(error);
            console.log(errorMessage);

            set({ error: errorMessage || "Error resetting password", isLoading: false });
            throw error;
		
		}
	},	verifyEmail: async (code) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/verify-email`, { code });
			set({ user: response.data.data, isAuthenticated: true, isLoading: false });
			return response.data;
		} catch (error) {
            let errorMessage = errors(error);
            console.log(errorMessage);

            set({ error: errorMessage || "Error verifying email", isLoading: false });
            throw error;
			
		}
	},	verify: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/verify`, { email });
			set({ user: response.data.data,  isLoading: false });
			return response.data;
		} catch (error) {
            let errorMessage = errors(error);
            console.log(errorMessage);

            set({ error: errorMessage || "Error sending verifying email", isLoading: false });
            throw error;
		
		}
	},updateProfile:async (formData) => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/update-profile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Required for file uploads
                },
            });            console.log(response);

            set({ user: response.data.data, isCheckingAuth:false,isAuthenticated: true});
        } catch (error) {
            let errorMessage = errors(error);
            console.log(error);

            set({ error: errorMessage, isCheckingAuth: false,isAuthenticated: false });
            throw error

        }
    },sendContactus:async (email,message) => {
        try {
          const response = await axios.post(`${API_URL}/contactus`,{email,message});
          console.log(response); // For debugging purposes
          // Return patient data if available
        } catch (error) {
          console.error("Error fetching patients:", error);
          return []; // Return an empty array in case of an error
        }
      }
      
}))


function errors(error) {
    let errorMessage;
    if (error.response && error.response.data) {
        const errors = error.response.data.errors;
        if (Array.isArray(errors)) {
            errorMessage = errors.map((err) => err.msg).join(", ");
        } else if (typeof errors === "string") {
            errorMessage = errors;
        }
    }
    console.log(errorMessage);
    
    return errorMessage;
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
