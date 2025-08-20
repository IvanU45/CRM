import {IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator";
import { VehicleStatus, VehicleType } from "generated/prisma";


export class CreateVehicle {
    @IsNotEmpty({message: "Укажите номер транспортного средства"})
    @IsString({message: "Номер должен быть в формате 'А000АА126'"})
    @MaxLength(9, {message: "Привышено допустимое количество символов"})
    licensePlate: string

    @IsNotEmpty({message: "Укажите модель транспортного средства"})
    @IsString()
    model: string

    @IsNotEmpty({message: "Укажите тип транспортного средства"})
    @IsEnum(VehicleType)
    vehicleType: VehicleType

    @IsNotEmpty({message: "Укажите грузоподъемность"})
    @IsNumber({}, {message: "Укажите грузоподъемность в тоннах"})
    @Min(0, {message: "Гузоподъемность не может быть отрицательной"})
    capacity: number

    @IsNotEmpty({message: "Укажите объем кузова"})
    @IsNumber({}, {message: "Укажите объем кузова в м3"})
    @Min(0, {message: "Объем кузова не может быть отрицательным"})
    volume: number

    @IsNotEmpty({message: "Укажите статус транспортного средства"})
    @IsEnum(VehicleStatus)
    vehicleStatus: VehicleStatus
}