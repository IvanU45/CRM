// components/ToastContainer.tsx
import React from 'react'
import { Toast, ToastType } from '../hooks/useToast'

interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

const getToastStyles = (type: ToastType): string => {
  const styles: Record<ToastType, string> = {
    success: 'bg-green-600 border-green-700',
    error: 'bg-red-600 border-red-700',
    warning: 'bg-yellow-600 border-yellow-700',
    info: 'bg-blue-600 border-blue-700',
  }
  return styles[type]
}

const getToastIcon = (type: ToastType): string => {
  const icons: Record<ToastType, string> = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  }
  return icons[type]
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getToastStyles(toast.type)} text-white px-4 py-3 rounded-lg shadow-lg border min-w-80 flex items-center space-x-3 animate-in slide-in-from-right-5`}
        >
          <span className="text-lg">{getToastIcon(toast.type)}</span>
          <div className="flex-1">
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
          <button
            onClick={() => onRemove(toast.id)}
            className="text-white hover:text-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}