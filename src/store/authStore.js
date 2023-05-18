import { create } from 'zustand';
import jwtDecode from 'jwt-decode';

const user = JSON.parse(localStorage.getItem("user"));

const useAuthStore = create((set) => ({
     token:user,
     user:user ? jwtDecode(user) : null,
     setupToken:(token) => set((state) => ({
          ...state,
          token:token, 
          user:token ? jwtDecode(token) : null
     })),
     logoutHandler:() => set((state) => ({
         ...state ,
         token:null,
         user:null
     })) 
}));

export default useAuthStore;