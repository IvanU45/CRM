// components/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl text-purple-600 mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-4">Страница не найдена</h1>
        <p className="text-gray-400 mb-8">
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <Link
          to="/"
          className="btn-primary"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};