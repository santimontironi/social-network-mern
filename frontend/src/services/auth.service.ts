import axios from 'axios'
import type { RegisterUserData, RegisterUserResponse, LoginUserData, LoginUserResponse, dashboardResponse } from '../types/auth.types'

const API_URL = import.meta.env.VITE_BACKEND_API

export const RegisterService = async (data: RegisterUserData) => {
    return await axios.post<RegisterUserResponse>(`${API_URL}/register`, data)
}

export const VerifyEmailService = async (token: string) => {
    return await axios.get(`${API_URL}/verify-email/${token}`)
}

export const LoginService = async (data: LoginUserData) => {
    return await axios.post<LoginUserResponse>(`${API_URL}/login`, data, { withCredentials: true })
}

export const DashboardService = async () => {
    return await axios.get<dashboardResponse>(`${API_URL}/dashboard`, { withCredentials: true })
}