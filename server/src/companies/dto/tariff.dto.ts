import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"
import { RateType } from "generated/prisma"

export class CreateTariff {
    @IsNotEmpty({message: "Укажите название тарифа"})
    @IsString()
    @MaxLength(50, {message: "Название не должно превышать 50 символов"})
    name: string

    @IsNotEmpty({message: "Укажите ставку"})
    @IsNumber({}, {message: "Ставка указывается в числовом формате"})
    rate: number  //ставка за км, кг, кмкг

    @IsNotEmpty({message: "Укажите тип ставки"})
    @IsEnum(RateType)
    rateType: RateType

    @IsNotEmpty({message: "Укажите минимальную цену"})
    @IsNumber({}, {message: "Цена указывается в числовом формате"})
    minPrice: number
}