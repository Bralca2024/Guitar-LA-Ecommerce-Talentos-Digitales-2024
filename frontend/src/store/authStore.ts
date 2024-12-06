import {create} from 'zustand';


interface AuthState{
    role: string | null;
    token: string | null;
    userID: string | null; 
    setRole: (role: string | null) => void;
    setToken: (token: string | null) => void;
    setUserID: (userID: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    role: localStorage.getItem('role'),
    setRole: (role) => {
        if(role){
            localStorage.setItem('role', role);
        }else{
            localStorage.removeItem('role')
        }
        set({role})
    },
    token: localStorage.getItem('token'),
    setToken: (token) => {
        if(token){
            localStorage.setItem('token', token);
        }else{
            localStorage.removeItem('token')
        }
        set({token})
    },
    
    userID: localStorage.getItem('userID'),
    setUserID: (userID) => {
        if (userID) {
            localStorage.setItem('userID', userID);
        } else {
            localStorage.removeItem('userID');
        }
        set({ userID });
    },
}))