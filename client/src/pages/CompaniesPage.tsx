// pages/CompaniesPage.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { companiesAPI, Company, EnumData } from '../api/companies';
import { CompanyCard } from '../components/CompanyCard';
import { CompanyForm } from '../components/CompanyForm';

export const CompaniesPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [enumData, setEnumData] = useState<EnumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { user, logout } = useAuth();

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const data = await companiesAPI.getCompanies();
      setCompanies(data.companies);
      setEnumData(data.enum);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-400">Загрузка компаний...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4 text-lg">Ошибка загрузки</div>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={loadCompanies}
            className="btn-primary"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-purple-400 flex items-center justify-center">
                <span className="text-white font-bold text-xl">Q</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Транспортные компании</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">
                {user?.name}
              </span>
              <button
                onClick={() => setShowCreateForm(true)}
                className="btn-primary text-sm"
              >
                + Новая компания
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {companies.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-500">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-8 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Нет компаний</h3>
            <p className="text-gray-400 mb-6">Создайте первую транспортную компанию</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="btn-primary"
            >
              Создать компанию
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {companies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                enumData={enumData!}
                onUpdate={loadCompanies}
              />
            ))}
          </div>
        )}
      </main>

      {showCreateForm && enumData && (
        <CompanyForm
          enumData={enumData}
          onClose={() => setShowCreateForm(false)}
          onSuccess={() => {
            setShowCreateForm(false);
            loadCompanies();
          }}
        />
      )}
    </div>
  );
};