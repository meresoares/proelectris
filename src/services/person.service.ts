// src/services/person.service.ts
import PersonModel from '../models/person.model';

class PersonService {
  public static async getAllPersons(): Promise<PersonModel[]> {
    try {
      const persons = await PersonModel.findAll({
        where: {
          deleted: false,
        }});
        console.log(persons)
      return persons;
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
