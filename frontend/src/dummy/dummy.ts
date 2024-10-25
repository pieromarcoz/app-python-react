export interface User {
    id: number;
    name: string;
    role: string;
    description: string;
    gender: 'male' | 'female';
    imgUrl?: string;
}
export interface ApiError {
    message: string;
    status?: number;
}
