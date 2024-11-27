import mongoose from "mongoose";
import { getAllUsersController, getUserByNameController, getUserByIdController, createUserController, updateUserController, deleteUserController } from "../controllers/usersController.js";
import User from "../schema/Users.js";
import Joi from 'joi';

const userSchema = Joi.object({
  username: Joi.string().min(3).max(15).required().messages({
    'string.empty': 'El nombre de usuario es obligatorio.',
    'string.min': 'El nombre de usuario debe tener al menos 3 caracteres.',
    'string.max': 'El nombre de usuario no puede tener más de 15 caracteres.',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Debes proporcionar un correo electrónico válido.',
    'string.empty': 'El correo electrónico es obligatorio.',
  }),
  //La contraseña tenga un mínimo de 6 caracteres, al menos 1 letra mayúscula, 1 letra minúscula y 1 número sin espacios
  password: Joi.string()
  .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,}$/)
  .required()
  .messages({
    'string.pattern.base': 'La contraseña debe tener al menos 6 caracteres, incluir una letra mayúscula, una letra minúscula y un número, y no debe contener espacios.',
    'string.empty': 'La contraseña es obligatoria.',
  }),
  fullName: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'El nombre completo es obligatorio.',
    'string.min': 'El nombre completo debe tener al menos 3 caracteres.',
    'string.max': 'El nombre completo no puede exceder los 50 caracteres.',
  }),
  dateOfBirth: Joi.date().optional().messages({
    'date.base': 'La fecha de nacimiento debe ser una fecha válida.',
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .optional()
    .messages({
      'string.pattern.base': 'El teléfono debe contener entre 10 y 15 dígitos.',
    }),
  address: Joi.string().optional().max(100).messages({
    'string.max': 'La dirección no puede exceder los 100 caracteres.',
  }),
  role: Joi.string().valid('admin', 'user').default('user').messages({
    'any.only': 'El rol debe ser "admin" o "user".',
  }),
});


const getAllUsersHandler = async (req, res) => {
  try {
    const {name} = req.query;
    if(name){
      const response = await getUserByNameController(name);
      res.status(200).send(response);
    } else {
      const response = await getAllUsersController();
      res.status(200).send(response);
    }
  } catch (error) {
    res.status(400).send({Error: error.message});
  }
}

const getOneUserHandler = async () => {
  try {
    const { id } = req.params;
    const response = await getUserByIdController(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(200).send({Error: error.message});
  }
}

const createUserHandler = async (req, res) => {
  try {
    // Validar datos con Joi
    const { error, value } = userSchema.validate(req.body, { abortEarly: false });

    //Envía todos los errores de validación 
    if (error) {
      return res.status(400).send({
        message: 'Error en los datos enviados.',
        details: error.details.map((detail) => detail.message),
      });
    }
    
    // Si los datos son válidos, procedemos a crear el usuario en la base de datos
    const { username, email, password, fullName, dateOfBirth, phone, address, role, createdAt } = value
    const response = await createUserController(username, email, password, fullName, dateOfBirth, phone, address, role);

    res.status(201).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({Error: error.message});
  }
}

const updateUserHandler = async (req, res) => {
  try {
    const {id} = req.params;
    const { username, email, fullName, dateOfBirth, phone, address} = req.body;
    const response = await updateUserController(id, username, email, fullName, dateOfBirth, phone, address);
    res.send(response);
  } catch (error) {
    res.status(200).send({Error: error.message});
  }
}

const deleteUserHandler = async (req, res) => {
  try {
    const {id} = req.params;
    const response = await deleteUserController(id);
    res.send(response);
  } catch (error) {
    res.status(200).send({Error: error.message});
  }
}

export {
  getAllUsersHandler,
  getOneUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler
}