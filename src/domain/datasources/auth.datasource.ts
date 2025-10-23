import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";


//todo: abstract login()

export abstract class AuthDatasource {

    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}