import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";


export const useAuthStore = create((set, get) => ({  // Add your initial states here
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    //Check authentication
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");  //we started from "auth" not from "http://localhost/api" bcz we already implemented it in axiosInstance so we build over it

            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },


    //SignUp   
    signup: async (data) => {                //we are getting this data from 'fromdata' in SignUpPage.jsx in line 34
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
        } catch (error) {
            // Handle error response, use optional chaining to safely access nested properties
            toast.error(error.response.data.message || "Login failed.");
        } finally {
            set({ isLoggingIn: false }); // Ensure loading state is reset
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");

        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async(data) => {
        set({ isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data});
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in updataing profile", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false});
        }
    },
}))