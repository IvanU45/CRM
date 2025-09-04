// api/companies.ts
import api from './axios';

export interface Company {
  id: string;
  name: string;
  description: string;
  address: string;
  area: string;
  phone: string;
  email: string;
  website: string;
  vehicles: Vehicle[];
  tariffs: Tariff[];
}

export interface Vehicle {
  id: string;
  licensePlate: string;
  model: string;
  vehicleType: string;
  capacity: number;
  volume: number;
  vehicleStatus: string;
  companyId?: string;
}

export interface Tariff {
  id: string;
  name: string;
  rate: number;
  rateType: string;
  minPrice: number;
  companyId?: string;
}

export interface CreateCompanyRequest {
  name: string;
  description: string;
  address: string;
  area: string;
  phone: string;
  email: string;
  website: string;
}

export interface CreateVehicleRequest {
  licensePlate: string;
  model: string;
  vehicleType: string;
  capacity: number;
  volume: number;
  vehicleStatus: string;
}

export interface CreateTariffRequest {
  name: string;
  rate: number;
  rateType: string;
  minPrice: number;
}

export interface EnumData {
  area: string[];
  vehicleStatus: string[];
  vehicleType: string[];
  rateType: string[];
}

export interface CompaniesResponse {
  companies: Company[];
  enum: EnumData;
}

export const companiesAPI = {
  getCompanies: async (): Promise<CompaniesResponse> => {
    const response = await api.get<CompaniesResponse>('/companies');
    return response.data;
  },

  createCompany: async (data: CreateCompanyRequest): Promise<Company> => {
    const response = await api.post<Company>('/companies/create', data);
    return response.data;
  },

  createVehicle: async (companyId: string, data: CreateVehicleRequest): Promise<Vehicle> => {
    const response = await api.post<Vehicle>(`/companies/${companyId}/vehicle/create`, data);
    return response.data;
  },

  createTariff: async (companyId: string, data: CreateTariffRequest): Promise<Tariff> => {
    const response = await api.post<Tariff>(`/companies/${companyId}/tariff/create`, data);
    return response.data;
  },

  updateCompany: async (id: string, data: Partial<CreateCompanyRequest>): Promise<Company> => {
    const response = await api.post<Company>(`/companies/company/${id}/update`, data);
    return response.data;
  },

  updateVehicle: async (id: string, data: Partial<CreateVehicleRequest>): Promise<Vehicle> => {
    const response = await api.post<Vehicle>(`/companies/vehicle/${id}/update`, data);
    return response.data;
  },

  updateTariff: async (id: string, data: Partial<CreateTariffRequest>): Promise<Tariff> => {
    const response = await api.post<Tariff>(`/companies/tariff/${id}/update`, data);
    return response.data;
  },

  deleteCompany: async (id: string): Promise<Company> => {
    const response = await api.post<Company>(`/companies/company/${id}/delete`);
    return response.data;
  },

  deleteVehicle: async (id: string): Promise<Vehicle> => {
    const response = await api.post<Vehicle>(`/companies/vehicle/${id}/delete`);
    return response.data;
  },

  deleteTariff: async (id: string): Promise<Tariff> => {
    const response = await api.post<Tariff>(`/companies/tariff/${id}/delete`);
    return response.data;
  },
};