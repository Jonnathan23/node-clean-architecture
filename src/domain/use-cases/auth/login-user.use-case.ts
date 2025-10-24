import { AuthRepository, CustomError } from "../..";
import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";

interface UserToken {
    token: string
    user: {
        id: string,
        name: string,
        email: string
    }
}

interface LoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken = JwtAdapter.generateToken
    ) { }
    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
        const user = await this.authRepository.login(loginUserDto)

        const token = await this.signToken({ id: user.id });
        if (!token) throw CustomError.internalServerError('Error generating token');

        return {
            token, user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
    }



}