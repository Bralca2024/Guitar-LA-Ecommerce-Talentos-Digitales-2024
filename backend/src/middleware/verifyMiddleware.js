import jwt from "jsonwebtoken";
import User from "../schema/Users.js"; // Importa el modelo de usuario

const verifyToken = async (req, res, next) => {
    // Verificar si la cabecera Authorization existe
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res
            .status(401)
            .send("Acceso denegado: No se proporcionó un token.");
    }

    // Extraer el token del formato "Bearer <token>"
    const token = authHeader.split(" ")[1];
    console.log("Token extraído:", token); // Muestra el token extraído
    if (!token) {
        return res
            .status(401)
            .send("Acceso denegado: Formato de token incorrecto.");
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token Decodificado:", decoded); // Muestra el contenido del token

        // Buscar el usuario en la base de datos para verificar su estado
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).send("Usuario no encontrado.");
        }

        if (user.estado !== "activo") {
            return res.status(403).send("Acceso denegado: Usuario inactivo.");
        }

        // Si el estado es válido, añadir los datos del usuario a `req.user`
        req.user = user;
        next();
    } catch (err) {
        console.log("Error de verificación del token:", err); // Muestra si hay un error
        if (err.name === "TokenExpiredError") {
            return res.status(401).send("El token ha expirado.");
        }
        if (err.name === "JsonWebTokenError") {
            return res.status(401).send("El token es inválido.");
        }
        return res.status(401).send("Error en la verificación del token.");
    }
};

export { verifyToken };
