import { UserMapper } from "..";
import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";


type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashedPassword: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ) { }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { name, password, email } = registerUserDto;

        try {
            const exists = await UserModel.findOne({ email })
            if (exists) throw CustomError.badRequest('Email already exists');

            const user = await UserModel.create({
                name: name,
                password: this.hashPassword(password),
                email: email
            });
            user.save();

            return UserMapper.userEntityFromObject(user);

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServerError()
        }
    }

}