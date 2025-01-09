import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";


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
}))