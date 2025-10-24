import { Request, Response } from "express";

import { AuthRepository, CustomError, LoginUser, LoginUserDto, RegisterUser, RegisterUserDto } from "../../domain";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";


export class AuthController {

    constructor(
        private readonly authRepository: AuthRepository
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log(error);
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)
        if (error) {
            return res.status(400).json({ error })
        }

        new RegisterUser(this.authRepository).execute(registerUserDto!)
            .then((user) => res.json(user))
            .catch((error) => this.handleError(error, res))

    }

    loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.login(req.body)
        if (error) {
            return res.status(400).json({ error })
        }

        new LoginUser(this.authRepository).execute(loginUserDto!)
            .then((user) => res.json(user))
            .catch((error) => this.handleError(error, res))
    }

    getUsers = (req: Request, res: Response) => {
        UserModel.find()
            .then((users) => res.json({
                // users,
                token: req.user

            }))
            .catch((error) => this.handleError(error, res))

    }

}