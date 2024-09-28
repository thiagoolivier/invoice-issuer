export interface CustomerAttributes {
  id: number;
  name: string;
  birth_date: string;
  cpf_cnpj: string;
  email: string;
  phone: string;
  address_region: string;
  address_city: string;
  address_postal_code: string;
  address_street: string;
  address_number: string;
  address_locality: string;
  address_region_code: string;
  address_country: string;
}

export type CustomerCreationAttributes = Omit<CustomerAttributes, 'id'>;

export interface CustomerForm extends CustomerCreationAttributes {}
