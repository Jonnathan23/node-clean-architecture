import { Router } from "express";
import { AuthRouter } from "./auth/routes";


export class AppRouter {

    static get routes(): Router {
        const router = Router();

        // Definir rutas prinicipales
        router.use('/api/auth', AuthRouter.routes )

        return router
    }
}