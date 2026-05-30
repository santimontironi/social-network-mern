export interface RegisterUserData{
    username: string;
    email: string;
    password: string;
    name: string;
    surname: string;
    birthDay: number;
    birthMonth: number;
    birthYear: number;
}

export interface RegisterUserResponse{
    message: string;
}

export interface LoginUserData{
    identifier: string;
    password: string;
}

export interface LoginUserResponse{
    message: string;
    user: {
        id: string;
        username: string;
        email: string;
    };
}

export interface User {
    id: string;
    username: string;
    email: string;
    name: string;
    surname: string;
}

export interface LoadingAuth {
    register: boolean;
    verify: boolean;
    login: boolean;
    home: boolean;
}

export interface dashboardResponse {
    user: User;
}