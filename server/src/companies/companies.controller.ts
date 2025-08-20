import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { CreateCompany } from './dto/createCompanies.dto';
import { CreateVehicle } from './dto/createVehicle.dto';
import { CreateTariff } from './dto/createTariff.dto';
import { UpdateCompany } from './dto/updateCompanies.dto';
import { UpdateVehicle } from './dto/updateVehicle.dto';
import { UpdateTariff } from './dto/updateTariff.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}
  
  @Authorization()
  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateCompany) {
    return await this.companiesService.createCompany(dto)
  }

  @Authorization()
  @Get("/")
  @HttpCode(HttpStatus.OK)
  async getCompanies() {
    return await this.companiesService.getCompanies()
  }

  @Authorization()
  @Post(":id/vehicle/create")
  @HttpCode(HttpStatus.CREATED)
  async createVehicle(
    @Body() dto: CreateVehicle,
    @Param("id") companyId: string) {
    return await this.companiesService.createVehicle(companyId, dto)
  }

  @Authorization()
  @Post(":id/tariff/create")
  @HttpCode(HttpStatus.CREATED)
  async createTariff(
    @Body() dto: CreateTariff,
    @Param("id") companyId: string) {
    return await this.companiesService.createTariff(companyId, dto)
  }

  @Authorization()
  @Post("company/:id/update")
  @HttpCode(HttpStatus.OK)
  async updateCompany(
    @Body() dto: UpdateCompany,
    @Param("id") id: string
  ) {
    return await this.companiesService.updateCompany(id, dto)
  }

  @Authorization()
  @Post("vehicle/:id/update")
  @HttpCode(HttpStatus.OK)
  async updateVehicle(
    @Body() dto: UpdateVehicle,
    @Param("id") id: string
  ) {
    return await this.companiesService.updateVehicle(id, dto)
  }

  @Authorization()
  @Post("tariff/:id/update")
  @HttpCode(HttpStatus.OK)
  async updateTariff(
    @Body() dto: UpdateTariff,
    @Param("id") id: string
  ) {
    return await this.companiesService.updateTariff(id, dto)
  }
}
