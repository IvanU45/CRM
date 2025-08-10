import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class RegisterRequest {
    @IsString({message: "Некорректный формат поля"})
    @IsNotEmpty({message: "Укажите имя пользователя"})
    @MaxLength(20, {message: "Имя пользователя не должно превышать 20 символов"})
    name: string

    @IsString({message: "Некорректный формат поля"})
    @IsNotEmpty({message: "Укажите адрес электронной почты"})
    @IsEmail({}, {message: "Некорректный формат электроной почты"})
    email: string

    @IsString({message: "Некорректный формат поля"})
    @IsNotEmpty({message: "Укажите пароль"})
    @MinLength(6, {message: "Пароль должен содержать не менее 6 символов"})
    @MaxLength(20, {message: "Пароль должен содержать не более 20 символов"})
    password: string
}