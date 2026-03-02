"use client";

import { create } from "zustand";

type Role = "ADMIN" | "STUDENT" | "TUTOR" | null;

type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status?: string;
};

type AuthPayload = {
  user: User;
  role: Role;
  token: string | null;
};

interface AuthState {
  user: User | null;
  role: Role;
  token: string | null;
  setAuth: (data: AuthPayload) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  token: null,

  setAuth: (data: AuthPayload) => {
    localStorage.setItem("auth", JSON.stringify(data));
    set(data);
  },

  logout: () => {
    localStorage.removeItem("auth");
    set({ user: null, role: null, token: null });
  },
}));