export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export type newUser = Omit<User, 'id'>;
export type updateUser = Partial<User>;
