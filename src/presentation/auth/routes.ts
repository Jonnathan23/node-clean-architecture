import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "./auth.mid";



export class AuthRouter {

    static get routes(): Router {
        const router = Router();

        // Instancias
        const authDatasource = new AuthDatasourceImpl()
        const authRepository = new AuthRepositoryImpl(authDatasource)

        const controller = new AuthController(authRepository);

        // Subrutas de autenticacion
        router.post('/login', controller.loginUser);
        router.post('/register', controller.registerUser);

        router.get('/',
            AuthMiddleware.validateJWT,
            controller.getUsers
        );

        return router
    }
}