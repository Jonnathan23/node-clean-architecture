import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";



export class AuthRouter {

    static get routes(): Router {
        const router = Router();

        // Instancias
        const authDatasource = new AuthDatasourceImpl()
        const authRepository = new AuthRepositoryImpl(authDatasource)
        
        const controller = new AuthController(authRepository);

        // Subrutas de autenticacion
        router.use('/login', controller.loginUser);
        router.use('/register', controller.registerUser);

        return router
    }
}