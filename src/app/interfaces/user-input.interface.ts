export interface UserInput {
  name: string;
  lastname: string;
  dni: string;
  email: string;
  password: string;
  rol?: 'admin' | 'user' | 'professional';
}
