export type AuthUser = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone_number: string;
  email: string;
  address: string;
};

export type SignUpFormData = {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone_number: string;
  address: string;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
};

export type LoginCredentials = {
  username: string;
  password: string;
};