

import { AuthRepository, CustomError, RegisterUserDto } from "../..";
import { JwtAdapter } from "../../../config";

interface UserToken {
    token: string
    user: {
        id: string,
        name: string,
        email: string
    }
}



interface RegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}


export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken = JwtAdapter.generateToken
    ) { }

    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        const user = await this.authRepository.register(registerUserDto)

        const token = await this.signToken({ id: user.id });
        if (!token) throw CustomError.internalServerError('Error generating token');

        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
    }

}