import { Router } from "express";


export class AuthRouter {

    static get routes(): Router {
        const router = Router();

        // Subrutas de autenticacion
        router.use('/login', (req, res) => {
            res.json('login')
        })
        router.use('/register', (req, res) => {
            res.json('register')
        })

        return router
    }
}