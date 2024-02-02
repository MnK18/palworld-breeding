import * as pinia from 'pinia';
import { findCollection } from "~/services/mongodb";
import type { PalType } from "~/types/PalType"

export const palStore = defineStore('palStore', {
  state: () => ({
    rows: [] as PalType[],
    loading: false, // new loading state
  }),
  actions: {
    async fetchPalData() {
      try {
        this.loading = true; // set loading to true before fetching
        const data = await findCollection('palworld_db', 'pal');
        this.rows = data as PalType[];
      } finally {
        this.loading = false; // set loading to false after fetching, whether successful or not
      }
    },
  },
});