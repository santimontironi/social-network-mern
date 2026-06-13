import { createContext, useState, useEffect } from "react";
import { RegisterService, VerifyEmailService, LoginService, DashboardService, LogoutService } from "../services/auth.service";
import type { RegisterUserResponse, LoginUserData, LoadingAuth, User } from "../types/auth.types";

interface contextAuthType {
    registerUser: (data: FormData) => Promise<RegisterUserResponse>
    verifyEmail: (token: string) => Promise<void>
    loginUser: (data: LoginUserData) => Promise<void>
    logoutUser: () => Promise<void>
    user: User | null
    loading: LoadingAuth
}

const AuthContext = createContext<contextAuthType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null)

    const [loading, setLoading] = useState<LoadingAuth>({
        register: false,
        verify: false,
        login: false,
        home: false
    })

    const registerUser = async (data: FormData) => {
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

    const verifyEmail = async (token: string) => {
        setLoading(prev => ({ ...prev, verify: true }))
        try{
            await VerifyEmailService(token)
        }
        catch(error){
            throw error
        }
        finally {
            setLoading(prev => ({ ...prev, verify: false }))
        }
    }

    const loginUser = async (data: LoginUserData) => {
        setLoading(prev => ({ ...prev, login: true }))
        try{
            const res = await LoginService(data)
            setUser(res.data.user)
        }
        catch(error){
            throw error
        }
        finally {
            setLoading(prev => ({ ...prev, login: false }))
        }
    }

    useEffect(() => {
        async function fetchUser(){
            setLoading(prev => ({ ...prev, home: true }))
            try{
                const res = await DashboardService()
                if(res.data.user){
                    setUser(res.data.user)
                }
                else{
                    setUser(null)
                }
            }
            catch(error){
                throw error
            }
            finally {
                setLoading(prev => ({ ...prev, home: false }))
            }
        }
        fetchUser()
    }, [])

    async function logoutUser() {
        try{
            await LogoutService()
            setUser(null)
        }
        catch(error){
            throw error
        }
    }

    return (
        <AuthContext.Provider value={{ registerUser, verifyEmail, loginUser, logoutUser, user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
