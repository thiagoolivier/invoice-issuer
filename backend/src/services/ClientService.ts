import Client from "../models/Client";
import { ClientCreationAttributes } from "../types";

export class ClientService {
  public async getClientById(id: string): Promise<Client | null> {
    const client = await Client.findByPk(id);
    return client;
  }

  public async getClients(): Promise<Client[]> {
    const clients = await Client.findAll();
    return clients;
  }  

  public async createClient(data: ClientCreationAttributes): Promise<Client> {
    try {
      const createdClient = await Client.create(data);
      return createdClient;
    } catch (error) {
      let message = 'Error during client creation.';

      if (error instanceof Error) {
        message = error.message;
      }

      throw new Error(message);
    }    
  }
}
