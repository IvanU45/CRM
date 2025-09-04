// components/VehicleForm.tsx
import React, { useState } from 'react';
import { companiesAPI, Vehicle, CreateVehicleRequest } from '../api/companies';

interface VehicleFormProps {
  vehicle?: Vehicle;
  companyId?: string;
  enumData: any;
  onClose: () => void;
  onSuccess: () => void;
}

export const VehicleForm: React.FC<VehicleFormProps> = ({ vehicle, companyId, enumData, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<CreateVehicleRequest>({
    licensePlate: vehicle?.licensePlate || '',
    model: vehicle?.model || '',
    vehicleType: vehicle?.vehicleType || '',
    capacity: vehicle?.capacity || 0,
    volume: vehicle?.volume || 0,
    vehicleStatus: vehicle?.vehicleStatus || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (vehicle) {
        await companiesAPI.updateVehicle(vehicle.id, formData);
      } else if (companyId) {
        await companiesAPI.createVehicle(companyId, formData);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка сохранения');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'number' ? parseFloat(value) : value 
    }));
  };

  const getVehicleTypeLabel = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'ФУРА': 'Фура',
      'РЕФРЕЖЕРАТОР': 'Рефрижератор',
      'КОНТЕЙНЕРОВОЗ': 'Контейнеровоз',
      'БОРТОВОЙ': 'Бортовой',
      'Т10': 'Т10',
      'Т5': 'Т5',
      'ГАЗЕЛЬ': 'Газель'
    };
    return typeMap[type] || type;
  };

  const getStatusLabel = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'ACTIVE': 'Активен',
      'INACTIVE': 'Неактивен',
      'MAINTENANCE': 'На обслуживании'
    };
    return statusMap[status] || status;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">
            {vehicle ? 'Редактировать транспорт' : 'Добавить транспорт'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Госномер *
            </label>
            <input
              type="text"
              name="licensePlate"
              required
              className="input-field"
              value={formData.licensePlate}
              onChange={handleChange}
              placeholder="А000АА26"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Модель *
            </label>
            <input
              type="text"
              name="model"
              required
              className="input-field"
              value={formData.model}
              onChange={handleChange}
              placeholder="Газель 2111"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Тип транспорта *
            </label>
            <select
              name="vehicleType"
              required
              className="input-field"
              value={formData.vehicleType}
              onChange={handleChange}
            >
              <option value="">Выберите тип</option>
              {enumData.vehicleType.map((type: string) => (
                <option key={type} value={type}>
                  {getVehicleTypeLabel(type)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Грузоподъемность (т) *
              </label>
              <input
                type="number"
                name="capacity"
                required
                step="0.1"
                min="0"
                className="input-field"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="1.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Объем (м³) *
              </label>
              <input
                type="number"
                name="volume"
                required
                min="0"
                className="input-field"
                value={formData.volume}
                onChange={handleChange}
                placeholder="12"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Статус *
            </label>
            <select
              name="vehicleStatus"
              required
              className="input-field"
              value={formData.vehicleStatus}
              onChange={handleChange}
            >
              <option value="">Выберите статус</option>
              {enumData.vehicleStatus.map((status: string) => (
                <option key={status} value={status}>
                  {getStatusLabel(status)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {loading ? 'Сохранение...' : (vehicle ? 'Сохранить' : 'Создать')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};