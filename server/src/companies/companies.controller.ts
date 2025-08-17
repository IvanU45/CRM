import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { CreateCompany } from './dto/companies.dto';
import { CreateVehicle } from './dto/vehicle.dto';

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
  async createVehicle(
    @Body() dto: CreateVehicle,
    @Param("id") companyId: string) {
    return await this.companiesService.createVehicle(companyId, dto)
  }
}
