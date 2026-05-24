export interface RegisterUserData{
    username: string;
    email: string;
    password: string;
    name: string;
    surname: string;
}

export interface RegisterUserResponse{
    message: string;
}

export interface LoginUserData{
    identifier: string;
    password: string;
}

export interface LoginUserResponse{
    id: string;
    username: string;
    email: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    name: string;
    surname: string;
}