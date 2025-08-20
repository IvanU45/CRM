import {IsEnum, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";
import { VehicleStatus, VehicleType } from "generated/prisma";


export class UpdateVehicle {
    @IsOptional()
    @IsString({message: "Номер должен быть в формате 'А000АА126'"})
    @MaxLength(9, {message: "Привышено допустимое количество символов"})
    licensePlate?: string

    @IsOptional()
    @IsString()
    model?: string

    @IsOptional()
    @IsEnum(VehicleType)
    vehicleType?: VehicleType

    @IsOptional()
    @IsNumber({}, {message: "Укажите грузоподъемность в тоннах"})
    @Min(0, {message: "Гузоподъемность не может быть отрицательной"})
    capacity?: number

    @IsOptional()
    @IsNumber({}, {message: "Укажите объем кузова в м3"})
    @Min(0, {message: "Объем кузова не может быть отрицательным"})
    volume?: number

    @IsOptional()
    @IsEnum(VehicleStatus)
    vehicleStatus?: VehicleStatus
}