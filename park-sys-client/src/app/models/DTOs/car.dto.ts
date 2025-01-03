export interface CreateCarDto {
    plateNumber: string;
    model: string;
    color: string;
}

export interface UpdateCarDto {
    model: string;
    color: string;
}

export interface CarDto {
    id: number;
    plateNumber: string;
    model: string;
    color: string;
}