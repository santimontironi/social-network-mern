import { createContext, useState } from "react";
import { RegisterService } from "../services/auth.service";
import type { RegisterUserData, RegisterUserResponse, LoadingAuth } from "../types/auth.types";

interface contextAuthType {
    registerUser: (data: RegisterUserData) => Promise<RegisterUserResponse>
    loading: LoadingAuth
}

const AuthContext = createContext<contextAuthType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [loading, setLoading] = useState<LoadingAuth>({
        register: false
    })
    
    const registerUser = async (data: RegisterUserData) => {
        setLoading(prev => ({ ...prev, register: true }))
        try{
            const res = await RegisterService(data)
            return res.data
        }
        catch(error){
            throw error
        }
        finally {
            setLoading(prev => ({ ...prev, register: false }))
        }
    }

    return (
        <AuthContext.Provider value={{ registerUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext



