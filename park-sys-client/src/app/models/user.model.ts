export interface User {
    id: number;
    email: string;
    name: string;
    phone: string;
    passwordHash: string;
    role: string;
    createdAt: Date;
}