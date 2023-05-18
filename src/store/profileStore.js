import { create } from "zustand";

const useProfileStore = create((set) => ({
     data:null ,
     setupProfile: (datas) => set((state) => ({
          ...state, 
          data:datas
     }))
}));

export default useProfileStore;