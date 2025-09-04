// components/TariffForm.tsx
import React, { useState } from 'react';
import { companiesAPI, Tariff, CreateTariffRequest } from '../api/companies';

interface TariffFormProps {
  tariff?: Tariff;
  companyId?: string;
  enumData: any;
  onClose: () => void;
  onSuccess: () => void;
}

export const TariffForm: React.FC<TariffFormProps> = ({ tariff, companyId, enumData, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<CreateTariffRequest>({
    name: tariff?.name || '',
    rate: tariff?.rate || 0,
    rateType: tariff?.rateType || '',
    minPrice: tariff?.minPrice || 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (tariff) {
        await companiesAPI.updateTariff(tariff.id, formData);
      } else if (companyId) {
        await companiesAPI.createTariff(companyId, formData);
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

  const getRateTypeLabel = (rateType: string) => {
    const rateTypeMap: { [key: string]: string } = {
      'кг': 'За килограмм',
      'км': 'За километр',
      'кгкм': 'За килограмм-километр'
    };
    return rateTypeMap[rateType] || rateType;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">
            {tariff ? 'Редактировать тариф' : 'Добавить тариф'}
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
              Название тарифа *
            </label>
            <input
              type="text"
              name="name"
              required
              className="input-field"
              value={formData.name}
              onChange={handleChange}
              placeholder="Малый/Средний/Крупный"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ставка *
              </label>
              <input
                type="number"
                name="rate"
                required
                min="0"
                step="0.01"
                className="input-field"
                value={formData.rate}
                onChange={handleChange}
                placeholder="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Тип ставки *
              </label>
              <select
                name="rateType"
                required
                className="input-field"
                value={formData.rateType}
                onChange={handleChange}
              >
                <option value="">Выберите тип</option>
                {enumData.rateType.map((rateType: string) => (
                  <option key={rateType} value={rateType}>
                    {getRateTypeLabel(rateType)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Минимальная цена (руб) *
            </label>
            <input
              type="number"
              name="minPrice"
              required
              min="0"
              step="1"
              className="input-field"
              value={formData.minPrice}
              onChange={handleChange}
              placeholder="100000"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {loading ? 'Сохранение...' : (tariff ? 'Сохранить' : 'Создать')}
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