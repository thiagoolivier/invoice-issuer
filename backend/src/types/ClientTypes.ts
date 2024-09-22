export interface ClientAttributes {
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

export type ClientCreationAttributes = Omit<ClientAttributes, 'id'>;

export interface ClientForm extends ClientCreationAttributes {}
