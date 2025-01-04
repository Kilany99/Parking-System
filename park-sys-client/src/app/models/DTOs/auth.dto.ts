export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    password: string;
    name: string;
    phone: string;
}

export interface AuthResponseDto {
    token: string;
    email: string;
    name: string;
    rol: string;
}