import { ToastOptions } from "./types/toastTypes";

type UserToastOptions = Omit<ToastOptions, "position" | "showTimer">;
export type AlertaType = {
  dismissAll(): void;
  success(message: string, options?: Partial<UserToastOptions>): void;
  error(message: string, options?: Partial<UserToastOptions>): void;
  info(message: string, options?: Partial<UserToastOptions>): void;
  warning(message: string, options?: Partial<UserToastOptions>): void;
};

const toastManager = (() => {
  let addToast: (options: ToastOptions) => void;
  let removeToast: (id: string) => void;
  let clearToasts: () => void;

  const register = (
    add: typeof addToast,
    remove: typeof removeToast,
    clear: typeof clearToasts
  ) => {
    addToast = add;
    removeToast = remove;
    clearToasts = clear;
  };

  const showToast = (options: ToastOptions) => {
    addToast?.(options);
  };

  const dismissToast = (id: string) => {
    removeToast?.(id);
  };

  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const alerta: AlertaType = {
    dismissAll() {
      clearToasts?.();
    },
    success(
      message: string,
      { title, duration = 5000, onClose }: Partial<UserToastOptions> = {}
    ) {
      showToast({
        id: generateRandomId(),
        type: "success",
        message,
        title,
        duration,
        onClose,
        position: "top-right",
      });
    },
    error(
      message: string,
      { title, duration = 5000, onClose }: Partial<UserToastOptions> = {}
    ) {
      showToast({
        id: generateRandomId(),
        type: "error",
        message,
        title,
        duration,
        onClose,
        position: "top-right",
      });
    },
    info(
      message: string,
      { title, duration = 5000, onClose }: Partial<UserToastOptions> = {}
    ) {
      showToast({
        id: generateRandomId(),
        type: "info",
        message,
        title,
        duration,
        onClose,
        position: "top-right",
      });
    },
    warning(
      message: string,
      { title, duration = 5000, onClose }: Partial<UserToastOptions> = {}
    ) {
      showToast({
        id: generateRandomId(),
        type: "warning",
        message,
        title,
        duration,
        onClose,
        position: "top-right",
      });
    },
  };

  return { alerta, dismissToast, register };
})();

export default toastManager;
