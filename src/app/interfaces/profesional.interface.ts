export interface Profesional {
  id: string;
  name: string;
  lastname: string;
  dni: string;
  phone: string;
  license: string;
  specialty: string;
  biography?: string;
  nameEstablishment: string;
  street: string;
  streetNumber: string;
  neighborhood: string;
  province: string;
  location: {
    latitude: number;
    longitude: number;
  };
  imagesUrl: string;
  email: string;
  password: string;
  active: boolean;
  postalCode: string;
  createdAt: string;
  updatedAt: string;
  services: Servicio[];
}

export interface Servicio {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}