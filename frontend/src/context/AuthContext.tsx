import { createContext, useState, useEffect } from "react";
import { RegisterService, VerifyEmailService, LoginService, DashboardService } from "../services/auth.service";
import type { RegisterUserData, RegisterUserResponse, LoginUserData, LoginUserResponse, LoadingAuth } from "../types/auth.types";

type LoggedUser = LoginUserResponse['user']

interface contextAuthType {
    registerUser: (data: RegisterUserData) => Promise<RegisterUserResponse>
    verifyEmail: (token: string) => Promise<void>
    loginUser: (data: LoginUserData) => Promise<LoginUserResponse>
    user: LoggedUser | null
    loading: LoadingAuth
}

const AuthContext = createContext<contextAuthType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<LoggedUser | null>(null)

    const [loading, setLoading] = useState<LoadingAuth>({
        register: false,
        verify: false,
        login: false,
        home: false
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
            return res.data
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

    return (
        <AuthContext.Provider value={{ registerUser, verifyEmail, loginUser, user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
