//we use this file, we can save the themes to the localstorage and everytime we refresh the page we still have the selected theme
import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "cupcake",
  setTheme: (theme) => {
    console.log("Setting theme:", theme);  // Add this log to check if the theme is being set
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
  
}));