import { create } from "zustand";

const authStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("horrorhubAccount")) || null,

  // Login
  login: (user) => {
    localStorage.setItem("horrorhubAccount", JSON.stringify(user));
    set({ user });
  },

  // Logout
  logout: () => {
    localStorage.removeItem("horrorhubAccount");
    set({ user: null });
  },
}));

export default authStore;
