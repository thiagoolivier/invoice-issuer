export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  role: string;
  customer_id: number;
}

export type UserCreationAttributes = Omit<UserAttributes, 'id'>;

export interface UserForm extends UserCreationAttributes {}
