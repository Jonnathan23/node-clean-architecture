import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";


export class AuthDatasourceImpl implements AuthDatasource {

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { name, password, email } = registerUserDto;

        try {
            return new UserEntity(
                '1',
                name,
                email,
                password,
                ["Admin"]
            )

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServerError()
        }
    }

}