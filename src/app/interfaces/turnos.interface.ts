export interface Turno {
  id?: string;
  idUser: string;
  idService: string;
  date: string;
  time: string;
  phone: string;
  petname: string;
  user?: {
    id: string;
    name: string;
    lastname: string;
    email: string;
  };
  service?: {
    id: string;
    name: string;
    description: string;
    price: number;
    professional: {
      id: string;
      name: string;
      lastname: string;
      specialty: string;
      nameEstablishment: string;
    }
  }
}
