// components/DeleteConfirmModal.tsx
import React from 'react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  loading?: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  loading = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        <p className="text-gray-300 mb-6">{message}</p>

        <div className="flex space-x-3">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="btn-danger flex-1 disabled:opacity-50"
          >
            {loading ? 'Удаление...' : 'Удалить'}
          </button>
          <button
            onClick={onClose}
            disabled={loading}
            className="btn-secondary flex-1"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};