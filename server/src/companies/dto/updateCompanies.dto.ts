import { IsEmail, IsOptional, IsPhoneNumber, IsString, MaxLength } from "class-validator"

export class UpdateCompany {
    @IsString()
    @IsOptional()
    @MaxLength(50, {message: "Максимальная длинна строки 50 символов"})
    name?: string

    @IsOptional()
    @MaxLength(200, {message: "Максимальная длинна строки 200 символов"})
    description?: string

    @IsOptional()
    @MaxLength(50, {message: "Максимальная длинна строки 50 символов"})
    address?: string

    @IsOptional()
    @MaxLength(50, {message: "Максимальная длинна строки 50 символов"})
    area?: string
    
    @IsPhoneNumber("RU")
    @IsOptional()
    @MaxLength(20, {message: "Максимальная длинна строки 20 символов"})
    phone?: string

    @IsEmail()
    @IsOptional()
    @MaxLength(50, {message: "Максимальная длинна строки 50 символов"})
    email?: string

    @IsOptional()
    @MaxLength(100, {message: "Максимальная длинна строки 100 символов"})
    website?: string
}