export interface User {
  id?: string;
  email: string;
  name?: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserUpdateDTO {
  name?: string;
  phone?: string;
}