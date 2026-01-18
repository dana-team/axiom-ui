import type { Cluster, Theme } from "@/consts";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchFilteredClusters } from "@/ClusterService";

type State = {
  clusters: Cluster[];
  filteredClusters: Cluster[];
  activeFilters: Record<string, string[]>;
  theme: Theme;
  loading: boolean;
  error: string | null;
  page: number;
  totalItems: number;
  setTheme: (theme: Theme) => void;
  setPage: (page: number) => void;
  fetchClusters: () => void;
  setActiveFilters: (filters: Record<string, string[]>) => void;
  setFilteredClusters: (filtered: Cluster[]) => void;
};

const setDocumentTheme = (theme: Theme): void => {
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
};

export const useStore = create<State>()(
  persist(
    (set) => ({
      clusters: [],
      filteredClusters: [],
      activeFilters: {},
      totalItems: 0,
      loading: false,
      error: null,
      page: 1,
      theme: "light",
      setTheme: (theme) => {
        set({ theme });
        setDocumentTheme(theme);
      },
      setPage: (page: number) => set({ page }),
      setActiveFilters: (filters) => set({ activeFilters: filters }),
      fetchClusters: async () => {
        await fetchFilteredClusters();
      },
      setFilteredClusters: (filtered) => set({ filteredClusters: filtered }),
    }),
    {
      name: "app-storage",
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
