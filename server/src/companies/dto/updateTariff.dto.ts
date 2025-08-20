import { IsEnum, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator"
import { RateType } from "generated/prisma"

export class UpdateTariff {
    @IsOptional()
    @IsString()
    @MaxLength(50, {message: "Название не должно превышать 50 символов"})
    name?: string

    @IsOptional()
    @IsNumber({}, {message: "Ставка указывается в числовом формате"})
    @Min(0, {message: "Ставка не может быть отрицательной"})
    rate?: number  //ставка за км, кг, кмкг

    @IsOptional()
    @IsEnum(RateType)
    rateType?: RateType

    @IsOptional()
    @IsNumber({}, {message: "Цена указывается в числовом формате"})
    @Min(0, {message: "Минимальная цена не может быть отрицательной"})
    minPrice?: number
}