import { createContext } from "react";
import { RegisterService } from "../services/auth.service";
import type { RegisterUserData, RegisterUserResponse } from "../types/auth.types";

interface contextAuthType {
    registerUser: (data: RegisterUserData) => Promise<RegisterUserResponse>
}

const AuthContext = createContext<contextAuthType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    
    const registerUser = async (data: RegisterUserData) => {
        try{
            const res = await RegisterService(data)
            return res.data
        }
        catch(error){
            throw error
        }
    }

    return (
        <AuthContext.Provider value={{ registerUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext



