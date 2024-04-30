import { IsEmail, IsInt, IsUUID } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    readonly email: string;
}
