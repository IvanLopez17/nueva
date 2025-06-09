import { api } from '../utils/api';
import type { Sale, CreateSaleData, DashboardStats } from '../types';

export const salesService = {
  async getSales(): Promise<Sale[]> {
    const response = await api.get('/sales/');
    return response.data.results || response.data;
  },

  async getSale(id: number): Promise<Sale> {
    const response = await api.get(`/sales/${id}/`);
    return response.data;
  },

  async createSale(saleData: CreateSaleData): Promise<Sale> {
    const response = await api.post('/sales/', saleData);
    return response.data;
  },

  async updateSale(id: number, saleData: Partial<CreateSaleData>): Promise<Sale> {
    const response = await api.put(`/sales/${id}/`, saleData);
    return response.data;
  },

  async deleteSale(id: number): Promise<void> {
    await api.delete(`/sales/${id}/`);
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get('/sales/dashboard-stats/');
    return response.data;
  }
};