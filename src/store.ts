import create from 'zustand';
import {persist} from 'zustand/middleware';

interface Store {
  captainMail: string | null;
  setCaptainMail: (email: string) => void;
  captainPass: string | null;
  setCaptainPass: (pass: string) => void;
}

export const useStore = create<Store>(
  persist(
    (set, get) => ({
      captainPass: null,
      setCaptainPass: (pass: string) => set({captainPass: pass}),

      captainMail: null,
      setCaptainMail: (email: string) => set({captainMail: email}),
    }),
    {name: 'main-storage'},
  ),
);
