import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompany } from './dto/companies.dto';
import { CreateVehicle } from './dto/vehicle.dto';
import { CreateTariff } from './dto/tariff.dto';

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

        return true
    }

    async getCompanies() {
        const companies = await this.prismaService.company.findMany()
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

        return true
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
        
        return true
    }
}

