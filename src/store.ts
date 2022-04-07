import create from 'zustand';
import {persist} from 'zustand/middleware';

interface Captain {
  captainMail: string;
  captainPass: string;
  captainBranch: string;
}

interface Store {
  captain: Captain | null;
  setCaptain: (capt: Captain) => void;
  adminPass: string | null;
  setAdminPass: (pass: string) => void;
}

export const useStore = create<Store>(
  persist(
    (set, get) => ({
      captain: null,
      setCaptain: (c: Captain) => set({captain: c}),
      adminPass: null,
      setAdminPass: (pass: string) => set({adminPass: pass}),
    }),
    {name: 'main-storage'},
  ),
);
