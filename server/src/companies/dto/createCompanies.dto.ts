import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength } from "class-validator"

export class CreateCompany {
    @IsString()
    @IsNotEmpty({message: "Укажите название"})
    @MaxLength(50, {message: "Максимальная длинна строки 50 символов"})
    name: string

    @IsOptional()
    @MaxLength(200, {message: "Максимальная длинна строки 200 символов"})
    description: string

    @IsNotEmpty({message: "Укажите адресс"})
    @MaxLength(50, {message: "Максимальная длинна строки 50 символов"})
    address: string

    @IsNotEmpty({message: "Укажите зону покрытия"})
    @MaxLength(50, {message: "Максимальная длинна строки 50 символов"})
    area: string
    
    @IsPhoneNumber("RU")
    @IsNotEmpty({message: "Укажите контактный телефон"})
    @MaxLength(20, {message: "Максимальная длинна строки 20 символов"})
    phone: string

    @IsEmail()
    @IsNotEmpty({message: "Укажите контактный email"})
    @MaxLength(50, {message: "Максимальная длинна строки 50 символов"})
    email: string

    @IsOptional()
    @MaxLength(100, {message: "Максимальная длинна строки 100 символов"})
    website: string
}