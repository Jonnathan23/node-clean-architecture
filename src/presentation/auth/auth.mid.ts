import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";

declare global {
    namespace Express {
        interface Request {
            user: Object;
        }
    }
}

export class AuthMiddleware {

    static validateJWT = async (req: Request, res: Response, next: NextFunction) => {
        const autorization = req.header('Authorization');
        if (!autorization) return res.status(401).json({ error: 'Access denied' });
        if (!autorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid token' });

        const token = autorization.split(' ').at(1) ?? '';

        try {
            const payload = await JwtAdapter.validateToken<{ id: string }>(token);
            if (!payload) return res.status(401).json({ error: 'Invalid token' });

            const user = await UserModel.findById(payload.id);
            if (!user) return res.status(401).json({ error: 'User not found' });


            req.user = user;

            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}