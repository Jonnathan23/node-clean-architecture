import { Router } from "express";
import { AuthController } from "./auth.controller";



export class AuthRouter {

    static get routes(): Router {
        const router = Router();
        const controller = new AuthController();

        // Subrutas de autenticacion
        router.use('/login', controller.loginUser);
        router.use('/register', controller.registerUser);

        return router
    }
}