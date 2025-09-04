// pages/HomePage.tsx (обновленная версия)
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const HomePage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      setIsAuthenticated(!!accessToken);
    };

    checkAuth();
  }, [user]);

  const handleStart = () => {
    if (isAuthenticated) {
      navigate('/companies');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <header className="bg-gray-900 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-5 max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-purple-400 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">Q</span>
              </div>
              <h1 className="text-2xl font-bold text-white">TransportManager</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1.5 rounded-full">
                  Управление транспортными компаниями
                </span>
              </div>
              <button 
                onClick={() => navigate(isAuthenticated ? '/companies' : '/login')}
                className="px-4 py-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
              >
                {isAuthenticated ? 'Панель управления' : 'Войти'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Управляйте транспортными компаниями
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Современная платформа для управления транспортными компаниями, 
            автомобилями и тарифами в одном месте
          </p>
          <button
            onClick={handleStart}
            className="btn-primary px-8 py-4 text-lg font-semibold"
          >
            {isAuthenticated ? 'Перейти к компаниям' : 'Начать работу'}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="card text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🏢</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Компании</h3>
            <p className="text-gray-400">
              Создавайте и управляйте транспортными компаниями с полной информацией
            </p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🚚</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Транспорт</h3>
            <p className="text-gray-400">
              Добавляйте автомобили с детальной информацией о характеристиках
            </p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">💰</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Тарифы</h3>
            <p className="text-gray-400">
              Настраивайте гибкую систему тарифов для каждой компании
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Готовы начать?</h3>
          <p className="text-gray-400 mb-6">
            Присоединяйтесь к платформе для эффективного управления транспортным бизнесом
          </p>
          <button
            onClick={handleStart}
            className="btn-primary px-6 py-3"
          >
            {isAuthenticated ? 'Перейти в панель' : 'Зарегистрироваться'}
          </button>
        </div>
      </main>

      <footer className="border-t border-gray-800 mt-12 py-8 bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-purple-400 flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-white font-medium">TransportManager</span>
            </div>
            <div className="flex space-x-6">
              <a href="/" className="text-gray-400 hover:text-purple-400 transition-colors">
                О платформе
              </a>
              <a href="/" className="text-gray-400 hover:text-purple-400 transition-colors">
                Контакты
              </a>
              <a href="/" className="text-gray-400 hover:text-purple-400 transition-colors">
                Помощь
              </a>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} TransportManager — Платформа управления транспортными компаниями
          </div>
        </div>
      </footer>
    </div>
  );
};