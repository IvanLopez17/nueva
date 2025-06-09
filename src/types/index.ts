export interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  profile_image?: string;
}

export interface Sale {
  id: number;
  sale_date: string;
  registration_date: string;
  reservation_code: string;
  client: string;
  total_sale: number;
  commission: number;
  advisor: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface DashboardStats {
  total_sales: number;
  total_amount: number;
  total_commission: number;
  monthly_sales: Array<{
    month: string;
    sales: number;
    amount: number;
  }>;
}

export interface CreateSaleData {
  sale_date: string;
  reservation_code: string;
  client: string;
  total_sale: number;
}