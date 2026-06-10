import { create } from "zustand";

interface AppState {
  isLoading: boolean;
  loadingProgress: number;
  hasEntered: boolean;
  setLoadingProgress: (progress: number) => void;
  finishLoading: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: true,
  loadingProgress: 0,
  hasEntered: false,
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),
  finishLoading: () => set({ isLoading: false, hasEntered: true }),
}));
