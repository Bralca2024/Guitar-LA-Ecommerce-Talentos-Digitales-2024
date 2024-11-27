import bcrypt from 'bcryptjs'
import User from '../schema/Users.js';
import jwt from 'jsonwebtoken';


const registerController = async (username, email, password, fullName, dateOfBirth, phone, address, role = 'user') => {
    // Verifica si el usuario ya existe por email o username
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
        throw new Error("El usuario ya está registrado (email o username en uso).");
    }

    // Hashea la contraseña
    const hashPassword = await bcrypt.hash(password, 10);
    
    // Guarda al usuario en la base de datos
    const savedUser = await newUser.save();

    // Excluye la contraseña antes de devolver el usuario creado
    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    return userWithoutPassword; // Devuelve el usuario sin la contraseña
}

const loginController = async (email, password) => {
    // Busca al usuario en la base de datos por email
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("El usuario no está registrado.");
    }

    // Compara la contraseña con la almacenada en la base de datos
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error("Contraseña incorrecta.");
    }

    const token = jwt.sign({id: user.id, role: user.role}, "my_secret_key", {expiresIn: "1h"});
    // Excluye la contraseña antes de devolver los datos del usuario
    const { password: _, ...userWithoutPassword } = user.toObject();

    return { message: "Inicio de sesión exitoso.", token, user: userWithoutPassword };
}

export {
    registerController,
    loginController
}