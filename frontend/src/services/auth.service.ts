import axios from 'axios'
import type { RegisterUserData, RegisterUserResponse } from '../types/auth.types'

const API_URL = import.meta.env.VITE_BACKEND_API

export const RegisterService = async (data: RegisterUserData) => {
    return await axios.post<RegisterUserResponse>(`${API_URL}/register`, data)
}