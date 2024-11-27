import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  // Verificar si la cabecera Authorization existe
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).send("Acceso denegado: No se proporcionó un token.");
    }

    // Extraer el token del formato "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res
        .status(401)
        .send("Acceso denegado: Formato de token incorrecto.");
    }

    // Verificar el token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).send("El token ha expirado.");
        }
        if (err.name === "JsonWebTokenError") {
            return res.status(401).send("El token es inválido.");
        }
        return res.status(401).send("Error en la verificación del token.");
        }

        // Si el token es válido, añadir los datos del usuario a `req.user`
        req.user = decoded;
        next();
    });
};

export { verifyToken };
