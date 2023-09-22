// src/services/person.service.ts
import { QueryTypes } from 'sequelize';
import PersonModel from '../models/person.model';

class PersonService {
  public static async getAllPersons(): Promise<PersonModel[]> {
    try {
      const sql = `
      WITH updated_ids AS (
        UPDATE persons
        SET deleted = false
        WHERE deleted = true
        RETURNING id
        )
      SELECT *
      FROM persons
      WHERE deleted = false AND id NOT IN (SELECT id FROM updated_ids);      
      `;
  
      const results = await PersonModel.sequelize?.query(sql, {
        type: QueryTypes.SELECT,
        raw: true,
      });
  
      if (results) {
        return results as PersonModel[];
      } else {
        return [];
      }
    } catch (error: any) {
      throw new Error('Error al obtener todas las personas: ' + error.message);
    }
  }
  
  

  public static async getPersonById(id: number): Promise<PersonModel | null> {
    try {
      const person = await PersonModel.findByPk(id);
      return person;
    } catch (error: any) {
      throw new Error('Error al obtener la persona por ID: ' + error.message);
    }
  }

  public static async createPerson(newPersonData: Partial<PersonModel>): Promise<PersonModel> {
    try {
      const newPerson = await PersonModel.create(newPersonData);
      return newPerson;
    } catch (error: any) {
      throw new Error('Error al crear la persona: ' + error.message);
    }
  }

  public static async updatePerson(id: number, updateData: Partial<PersonModel>): Promise<PersonModel | null> {
    try {
      const person = await PersonModel.findByPk(id);
      if (person) {
        await person.update(updateData);
        return person;
      } else {
        return null;
      }
    } catch (error: any) {
      throw new Error('Error al actualizar la persona: ' + error.message);
    }
  }

  public static async deletePerson(id: number): Promise<boolean> {
    try {
      const person = await PersonModel.findByPk(id);
      if (person) {
        // Marcar la persona como eliminada lógicamente
        await person.update({ deleted: true });
        return true; // Éxito
      }
      return false;
    } catch (error: any) {
      throw new Error('Error al eliminar lógicamente la persona: ' + error.message);
    }
  }
}

export default PersonService;
