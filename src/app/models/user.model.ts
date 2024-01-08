export interface User {
  nId: number;
  firstName: string;
  lastName: string;
  gender: string;
  privateNumber: string;
  mobileNumber: string;
  addressActual: string;
  cityActual: string;
  countryActual: string;
  addressLegal: string;
  cityLegal: string;
  countryLegal: string;
}

export interface Address {
  country: string;
  city: string;
  address: string;
}
