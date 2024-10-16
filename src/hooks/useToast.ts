import { useState, useEffect } from "react";
import toastManager from "../toastManager";
import { ToastOptions } from "../types/toastTypes";

const useToast = () => {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const addToast = (options: ToastOptions) => {
    setToasts((prev) => {
      const updatedToasts = prev.length >= 5 ? prev.slice(1) : prev;
      return [...updatedToasts, { ...options }];
    });
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const clearToasts = () => {
    setToasts([]);
  }

  useEffect(() => {
    toastManager.register(addToast, removeToast, clearToasts);
  }, []);

  return { toasts, removeToast, addToast };
};
export default useToast;
