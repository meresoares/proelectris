// src/controllers/person.controller.ts
import { Request, Response } from 'express';
import PersonService from '../services/person.service';
import PersonModel from '../models/person.model';

class PersonController {
  public async getAllPersons(req: Request, res: Response): Promise<void> {
    try {
      const persons: PersonModel[] = await PersonService.getAllPersons();
      res.status(200).json(persons);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public static async getPersonById(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10);
    try {
      const person: PersonModel | null = await PersonService.getPersonById(id);
      if (person && !person.deleted) {
        res.status(200).json(person);
      } else {
        res.status(404).json({ message: 'Persona no encontrada' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public static async createPerson(req: Request, res: Response): Promise<void> {
    const newPersonData: Partial<PersonModel> = req.body;
    try {
      const newPerson: PersonModel = await PersonService.createPerson(newPersonData);
      res.status(201).json(newPerson);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public static async deletePerson(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10);
    try {
      const success = await PersonService.deletePerson(id);
      if (success) {
        res.status(200).json({ message: 'Persona eliminada exitosamente' });
      } else {
        res.status(404).json({ message: 'Persona no encontrada' });
      } 
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } 
}

export default PersonController;
