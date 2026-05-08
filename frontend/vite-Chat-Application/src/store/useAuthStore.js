import { create } from 'zustand';
import { axiosInstance } from "../lib/axios.js";
import { toast } from 'react-hot-toast';

const useAuthStore = create((set) => ({
    authUser: null,
    ischeckingAuth: true,
    isSigningUp: false,


    checkAuth: async () => {


    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const response = await axiosInstance.post("/auth/signup", data)
            set({ authUser: response.data });

            toast.success(response.data.message);

        } catch (error) {
            toast.error(error.response.data.message);


        }
        finally {
            set({ isSigningUp: false });
        }


    }





}))

export default useAuthStore