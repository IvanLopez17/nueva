import React, { useState, useEffect } from 'react';
import { salesService } from '../services/salesService';
import { X, Calendar, Code, User, DollarSign } from 'lucide-react';
import type { Sale, CreateSaleData } from '../types';

interface SaleModalProps {
  sale?: Sale | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SaleModal({ sale, isOpen, onClose, onSuccess }: SaleModalProps) {
  const [formData, setFormData] = useState<CreateSaleData>({
    sale_date: '',
    reservation_code: '',
    client: '',
    total_sale: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (sale) {
      setFormData({
        sale_date: sale.sale_date.split('T')[0],
        reservation_code: sale.reservation_code,
        client: sale.client,
        total_sale: sale.total_sale
      });
    } else {
      setFormData({
        sale_date: new Date().toISOString().split('T')[0],
        reservation_code: '',
        client: '',
        total_sale: 0
      });
    }
  }, [sale]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'total_sale' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (sale) {
        await salesService.updateSale(sale.id, formData);
      } else {
        await salesService.createSale(formData);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al guardar la venta');
    } finally {
      setLoading(false);
    }
  };

  const commission = formData.total_sale * 0.3;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {sale ? 'Editar Venta' : 'Nueva Venta'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">
              Cliente
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="client"
                name="client"
                required
                value={formData.client}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nombre del cliente"
              />
            </div>
          </div>

          <div>
            <label htmlFor="reservation_code" className="block text-sm font-medium text-gray-700 mb-1">
              Código de Reserva
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Code className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="reservation_code"
                name="reservation_code"
                required
                value={formData.reservation_code}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Código único de reserva"
              />
            </div>
          </div>

          <div>
            <label htmlFor="sale_date" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Venta
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="sale_date"
                name="sale_date"
                required
                value={formData.sale_date}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="total_sale" className="block text-sm font-medium text-gray-700 mb-1">
              Total de Venta
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="total_sale"
                name="total_sale"
                required
                min="0"
                step="0.01"
                value={formData.total_sale}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Commission Display */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-800">Comisión (30%):</span>
              <span className="text-lg font-bold text-blue-900">
                ${commission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Guardando...
                </div>
              ) : (
                sale ? 'Actualizar' : 'Crear Venta'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}