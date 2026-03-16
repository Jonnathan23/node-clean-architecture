

export class GetAllUsersDto {


    static getAllUsers(): [string?, GetAllUsersDto?] {        
        return ['', new GetAllUsersDto()]
    }



}