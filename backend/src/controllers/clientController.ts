import { Request, Response } from "express";
import { ClientService } from "../services/ClientService";

export const createClient = async (req: Request, res: Response) => {
  try {
    const service = new ClientService();

    const client = await service.createClient({
      name: req.body.name,
      cpf_cnpj: req.body.cpf_cnpj,
      email: req.body.email,
      phone: req.body.phone,
      birth_date: req.body.birth_date,
      address_city: req.body.address_city,
      address_country: req.body.address_country,
      address_locality: req.body.address_locality,
      address_number: req.body.address_number,
      address_postal_code: req.body.address_postal_code,
      address_region: req.body.address_region,
      address_region_code: req.body.address_region_code,
      address_street: req.body.address_street
    });

    res.status(201).json({
      message: 'Cliente successfuly created!',
      client
    });
  } catch (error: unknown) {
    let errorMessage = 'Unknown error occurred while creating client.';

    if (error instanceof Error) {
      errorMessage = `Error creating client: ${error.message}`;
    }

    res.status(500).json({
      message: errorMessage,
      error: error
    });
  }
};
