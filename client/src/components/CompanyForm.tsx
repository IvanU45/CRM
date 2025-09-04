// components/CompanyForm.tsx
import React, { useState } from 'react';
import { companiesAPI, Company, CreateCompanyRequest } from '../api/companies';

interface CompanyFormProps {
  company?: Company;
  enumData: any;
  onClose: () => void;
  onSuccess: () => void;
}

export const CompanyForm: React.FC<CompanyFormProps> = ({ company, enumData, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<CreateCompanyRequest>({
    name: company?.name || '',
    description: company?.description || '',
    address: company?.address || '',
    area: company?.area || '',
    phone: company?.phone || '',
    email: company?.email || '',
    website: company?.website || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (company) {
        await companiesAPI.updateCompany(company.id, formData);
      } else {
        await companiesAPI.createCompany(formData);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка сохранения');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getAreaLabel = (area: string) => {
    const areaMap: { [key: string]: string } = {
      STAVROPOLSKIY_KRAY: 'Ставропольский край',
      ROSTOVSKAYA_OBLAST: 'Ростовская область',
      KRASNODARSKIY_KRAY: 'Краснодарский край'
    };
    return areaMap[area] || area;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">
            {company ? 'Редактировать компанию' : 'Создать компанию'}
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
              Название компании *
            </label>
            <input
              type="text"
              name="name"
              required
              className="input-field"
              value={formData.name}
              onChange={handleChange}
              placeholder="Введите название компании"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Описание
            </label>
            <textarea
              name="description"
              rows={3}
              className="input-field"
              value={formData.description}
              onChange={handleChange}
              placeholder="Описание компании"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Адрес *
            </label>
            <input
              type="text"
              name="address"
              required
              className="input-field"
              value={formData.address}
              onChange={handleChange}
              placeholder="Введите адрес"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Регион *
            </label>
            <select
              name="area"
              required
              className="input-field"
              value={formData.area}
              onChange={handleChange}
            >
              <option value="">Выберите регион</option>
              {enumData.area.map((area: string) => (
                <option key={area} value={area}>
                  {getAreaLabel(area)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Телефон *
            </label>
            <input
              type="tel"
              name="phone"
              required
              className="input-field"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+7 (999) 999-99-99"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              className="input-field"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Вебсайт
            </label>
            <input
              type="url"
              name="website"
              className="input-field"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {loading ? 'Сохранение...' : (company ? 'Сохранить' : 'Создать')}
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