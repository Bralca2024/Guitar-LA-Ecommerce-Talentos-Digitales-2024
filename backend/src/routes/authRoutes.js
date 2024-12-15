import { Router } from "express";
import { registerHandler, loginHandler} from "../handlers/authHandler.js";
import passport from '../middleware/googleAuth.js';

const authRouter = Router();

authRouter.post("/register", registerHandler);
authRouter.post("/login", loginHandler);
authRouter.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false})
);
authRouter.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    (req, res) => {
        const { token, user } = req.user;

        if (token && user) {
            res.json({ token, user });  // Enviar la respuesta al frontend
        } else {
            res.status(500).json({ message: 'Error al generar el token' });
        }
    }
);

export default authRouter;