import User from '../schema/Users.js'
import bcrypt from 'bcryptjs'

const getAllUsersController = async () => {
    const users = await User.find();
    if (!users.length) throw new Error("No hay usuarios");
    return users;
}

const getUserByNameController = async (name) =>{
    const usersByName = await User.find({name});
    if(!usersByName.length) throw new Error("No se encontro ese usuario");
    return usersByName;
}

const getUserByIdController = async (id) => {
    const userById = await User.findById(id);
    if (!userById) throw new Error("Usuario no encontrado");
    return userById;
}

const createUserController = async (username, email, password, fullName, dateOfBirth, phone, address, role, createdAt) => {
const hashPassword = await bcrypt.hash(password, 10);
const newUser = new User({ username, email, password: hashPassword, fullName, dateOfBirth, phone, address, role, createdAt});
return await newUser.save();
}

const updateUserController = async (id, username, email, fullName, dateOfBirth, phone, address ) => {
    const userData = { username, email, fullName, dateOfBirth, phone, address, };
    const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });

    return updatedUser;
}

const deleteUserController = async (id) => {
    let deleteUser = await User.findByIdAndDelete(id);
    return deleteUser;
}

export {
getAllUsersController,
getUserByNameController,
getUserByIdController,
createUserController,
updateUserController,
deleteUserController
}
