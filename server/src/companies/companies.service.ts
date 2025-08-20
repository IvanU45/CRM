import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompany } from './dto/createCompanies.dto';
import { CreateVehicle } from './dto/createVehicle.dto';
import { CreateTariff } from './dto/createTariff.dto';
import { UpdateCompany } from './dto/updateCompanies.dto';
import { UpdateVehicle } from './dto/updateVehicle.dto';
import { UpdateTariff } from './dto/updateTariff.dto';

@Injectable()
export class CompaniesService {
    constructor(private readonly prismaService: PrismaService) {}

    async createCompany(dto: CreateCompany) {
        const {name, description, address, area, phone, email, website} = dto

        const existName = await this.prismaService.company.findUnique({
            where: {
                name
            }
        })
        if (existName) {
            throw new ConflictException("Компания с таким названием уже существует")
        }

        const company = await this.prismaService.company.create({
            data: {
                name,
                description,
                address,
                area,
                phone,
                email,
                website
            }
        })

        return company
    }

    async getCompanies() {
        const companies = await this.prismaService.company.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                address: true,
                area: true,
                phone: true,
                email: true,
                website: true,
                vehicles: {
                    select: {
                        id: true,
                        licensePlate: true,
                        model: true,
                        vehicleType: true,
                        capacity: true,
                        volume: true,
                        vehicleStatus: true,
                        }
                },
                tariffs: {
                    select: {
                            id: true,
                            name: true,
                            rate: true,
                            rateType: true,
                            minPrice: true,
                    }
                }
            }
        })
        return companies
    }

     async createVehicle(companyId: string, dto: CreateVehicle) {
        const {licensePlate, model, vehicleType, capacity, volume, vehicleStatus} = dto

        const existVehicle = await this.prismaService.vehicle.findUnique({
            where: {
                licensePlate
            }
        })

        if (existVehicle) {
            throw new ConflictException("Такое транспортное средство уже существует")
        }

        const vehicle = await this.prismaService.vehicle.create({
            data: {
                companyId,
                licensePlate,
                model,
                vehicleType,
                capacity,
                volume,
                vehicleStatus
            }
        })

        return vehicle
    }

    async createTariff(companyId: string, dto: CreateTariff) {
        const {name, rate, rateType, minPrice} = dto
        const tariff = await this.prismaService.tariff.create({
            data: {
                companyId,
                name,
                rate,
                rateType,
                minPrice
            }
        })
        
        return tariff
    }

    async updateCompany(id: string, dto: UpdateCompany) {
        const existCompany = await this.prismaService.company.findUnique({
            where: {
                id
            }
        })
        if (!existCompany) {
            throw new ConflictException("Компания не найдена")
        }

        if (Object.keys(dto).length == 0) {
            throw new BadRequestException("Не передано данных для обновления")
        }

        const company = await this.prismaService.company.update({
            where: {id},
            data: dto
        })

        return company
    }

    async updateVehicle(id: string, dto: UpdateVehicle) {
        const existVehicle = await this.prismaService.vehicle.findUnique({
            where: {
                id
            }
        })
        if (!existVehicle) {
            throw new ConflictException("Транспорт не найдена")
        }

        if (Object.keys(dto).length == 0) {
            throw new BadRequestException("Не передано данных для обновления")
        }

        const vehicle = await this.prismaService.vehicle.update({
            where: {id},
            data: dto
        })

        return vehicle
    }

    async updateTariff(id: string, dto: UpdateTariff) {
        const existTariff = await this.prismaService.tariff.findUnique({
            where: {
                id
            }
        })
        if (!existTariff) {
            throw new ConflictException("Тариф не найдена")
        }

        if (Object.keys(dto).length == 0) {
            throw new BadRequestException("Не передано данных для обновления")
        }

        const tariff = await this.prismaService.tariff.update({
            where: {id},
            data: dto
        })

        return tariff
    }
}

