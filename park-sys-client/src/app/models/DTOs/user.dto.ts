export interface UserDto {
    id: number;
    email: string;
    name: string;
    phone: string;
    role: string;
}

export interface UpdateUserDto {
    name: string;
    phone: string;
    role: string;
}

export interface CreateUserDto {
    email: string;
    name: string;
    phone: string;
    role: string;
    password: string;
  }
  