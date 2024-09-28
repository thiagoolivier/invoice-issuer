import Customer from "../models/Customer";
import { CustomerCreationAttributes } from "../types";

export class CustomerService {
  public async getCustomerById(id: string): Promise<Customer | null> {
    const customer = await Customer.findByPk(id);
    return customer;
  }

  public async getCustomers(): Promise<Customer[]> {
    const customers = await Customer.findAll();
    return customers;
  }  

  public async createCustomer(data: CustomerCreationAttributes): Promise<Customer> {
    try {
      const createdCustomer = await Customer.create(data);
      return createdCustomer;
    } catch (error) {
      let message = 'Error during customer creation.';

      if (error instanceof Error) {
        message = error.message;
      }

      throw new Error(message);
    }    
  }
}
