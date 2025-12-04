import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: ToastMessage = { id, message, type };
    
    setToasts((prev) => [...prev, newToast]);
    
    // 3초 후 자동 제거
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const getToastConfig = (type: ToastType) => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-500',
          borderColor: 'border-green-400',
          textColor: 'text-green-50',
          iconColor: 'text-white',
        };
      case 'error':
        return {
          icon: XCircle,
          bgColor: 'bg-red-500',
          borderColor: 'border-red-400',
          textColor: 'text-red-50',
          iconColor: 'text-white',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-yellow-500',
          borderColor: 'border-yellow-400',
          textColor: 'text-yellow-50',
          iconColor: 'text-white',
        };
      case 'info':
      default:
        return {
          icon: Info,
          bgColor: 'bg-blue-500',
          borderColor: 'border-blue-400',
          textColor: 'text-blue-50',
          iconColor: 'text-white',
        };
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container - 화면 최상단 중앙, z-[9999] 고정 */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] pointer-events-none px-4 w-full max-w-md sm:max-w-lg">
        <div className="flex flex-col gap-2">
          <AnimatePresence>
            {toasts.map((toast) => {
              const config = getToastConfig(toast.type);
              const Icon = config.icon;
              
              return (
                <motion.div
                  key={toast.id}
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className={`${config.bgColor} ${config.borderColor} border-2 rounded-lg shadow-2xl px-4 py-3 flex items-center gap-3 pointer-events-auto`}
                >
                  <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0`} />
                  <p className={`flex-1 ${config.textColor} font-semibold text-sm sm:text-base`}>
                    {toast.message}
                  </p>
                  <button
                    onClick={() => removeToast(toast.id)}
                    className={`${config.textColor} hover:opacity-80 transition-opacity flex-shrink-0 touch-manipulation min-w-[24px] min-h-[24px] flex items-center justify-center`}
                    aria-label="닫기"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </ToastContext.Provider>
  );
}

