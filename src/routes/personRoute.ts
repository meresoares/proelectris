// src/routes/personRoute.ts
import { Router, Request, Response } from "express";
import PersonModel from "../models/person.model";
import PersonService from "../services/person.service";

const personRouter = Router();

// Ruta para obtener todas las personas
personRouter.get("/", async (req: Request, res: Response) => {
  try {
    // Consulta todas las personas en la base de datos
    const persons = await PersonModel.findAll();
    
    // Envía la lista de personas como respuesta
    res.status(200).json(persons);
  } catch (error) {
    console.error("Error al obtener todas las personas:", error);
    res.status(500).json({ error: "Error al obtener todas las personas" });
  }
});

// Ruta para obtener una persona por su ID
personRouter.get("/:id", async (req: Request, res: Response) => {
  // Implementación de la ruta POST para crear una nueva persona
  try {

    // Obtiene el ID de la persona de los parámetros de la ruta
    const id = req.params.id;
    const person = await PersonModel.findByPk(id);
    
    // Si no se encuentra la persona, responde con el código HTTP 404
    if (!person) {
      res.status(404).json({ message: "Persona no encontrada"});
      return;
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la persona"});
  }
});

// Ruta para actualizar una persona por su ID
personRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updateData = req.body; 
    // Los datos de actualización se envían en el cuerpo de la solicitud

    const person = await PersonModel.findByPk(id);

    if (!person) {
      res.status(404).json({ message: "Persona no encontrada" });
      return;
    }

    // Actualiza los datos de la persona
    await person.update(updateData);

    // Responde con el código HTTP 200 y la persona actualizada
    res.status(200).json(person);
  } catch (error) {
    console.error("Error al actualizar la persona:", error);
    res.status(500).json({ error: "Error al actualizar la persona" });
  }
});

// Ruta para crear una nueva persona
personRouter.post("/", async (req: Request, res: Response) => {
  // Implementación de la ruta GET para obtener una persona por su ID
  try {
    // Obtiene los datos de la persona del cuerpo de la solicitud
    const { name, address, phone, email, tax_id } = req.body;
    
    // Crea una nueva persona en la base de datos
    const newPerson = await PersonModel.create({ name, address, phone, email, tax_id });

    // Responde con el código HTTP 201 y la persona creada
    res.status(201).json(newPerson);
  } catch (error) {
    // Responde con el código HTTP 500 y el mensaje de error
    console.error("Error al crear una nueva persona:", error);
    res.status(500).json({ error: "Error al crear una nueva persona" });
  }
});

// Ruta para eliminar una persona
personRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    const id = parseInt(idParam, 10); // Parsea el parámetro 'id' a un número

    if (isNaN(id)) {
      // Si 'id' no es un número válido, responde con un error 400 (Bad Request)
      res.status(400).json({ error: 'El parámetro ID no es un número válido' });
      return;
    }

    const success = await PersonService.deletePerson(id);

    if (success) {
      res.status(200).json({ message: 'Persona eliminada lógicamente' });
    } else {
      res.status(404).json({ message: 'Persona no encontrada' });
    }
  } catch (error) {
    console.error('Error al eliminar lógicamente la persona:', error);
    res.status(500).json({ error: 'Error al eliminar lógicamente la persona' });
  }
});



export default personRouter;
