export interface User {
    firstName: string;
    lastName: string;
    gender: string;
    privateNumber: string;
    mobileNumber: string;
    legalAddress: Address;
    actualAddress: Address;
  }
  
  export interface Address {
    country: string;
    city: string;
    address: string;
  }
  