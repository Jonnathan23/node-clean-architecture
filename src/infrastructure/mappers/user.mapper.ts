import { CustomError, UserEntity } from "../../domain";


export class UserMapper {

    static userEntityFromObject(object: { [key: string]: any }): UserEntity {
        const { _id, id, name, email, password, roles } = object;
        if (!id && !_id) {
            throw new Error('Missing id field');
        }

        if (!name) throw CustomError.badRequest('Missing name field');
        if (!email) throw CustomError.badRequest('Missing email field');
        if (!password) throw CustomError.badRequest('Missing password field');
        if (!roles) throw CustomError.badRequest('Missing roles field');

        return new UserEntity(
            id || _id,
            name,
            email,
            password,
            roles
        );
    }


}