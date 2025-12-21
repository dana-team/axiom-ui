import type { Cluster, Theme } from "@/consts";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  selectedClusters: Cluster[];
  theme: Theme;
  addCluster: (cluster: Cluster) => void;
  removeCluster: (id: string) => void;
  resetClusters: () => void;
  setTheme: (theme: Theme) => void;
};

const setDocumentTheme = (theme: Theme): void => {
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      selectedClusters: [],
      theme: "light",

      addCluster: (cluster) =>
        set((state) => ({
          selectedClusters: [...state.selectedClusters, cluster],
        })),
      removeCluster: (id) =>
        set((state) => ({
          selectedClusters: state.selectedClusters.filter((c) => c.id !== id),
        })),
      resetClusters: () => set({ selectedClusters: [] }),
      setTheme: (theme) => {
        set({ theme });
        setDocumentTheme(theme);
      },
    }),
    {
      name: "app-storage",
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
