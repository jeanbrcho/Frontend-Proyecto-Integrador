export interface IProfile {
    id: string;
    name: string;
    lastname: string;
    dni: string;
    email: string;
    rol?: string;
    iat?: number;
    exp?: number;
}