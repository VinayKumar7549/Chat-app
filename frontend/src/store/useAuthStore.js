import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
    // Add your initial states here
    autherUser: null,
    isSiginingUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth:true,  

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");   //we started from "auth" not from "http://localhost/api" bcz we already implemented it in axiosInstance so we build over it

            set({ authuser: res.data});

        } catch (error) {

            set({ authUser: null })

        } finally {
            
            set({ isCheckingAuth: false });
        }
    }
}))