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

  /**
   * Registers the add and remove and clear functions.
   * @param {function} add - Function to add a toast.
   * @param {function} remove - Function to remove a toast by ID.
   * @param {function} clear - Function to clear all active toasts
   */
  const register = (
    add: typeof addToast,
    remove: typeof removeToast,
    clear: typeof clearToasts
  ) => {
    addToast = add;
    removeToast = remove;
    clearToasts = clear;
  };

  /**
   * Shows a toast with the provided options.
   * @param {ToastOptions} options - The options for the toast (message, type, etc.).
   */
  const showToast = (options: ToastOptions) => {
    addToast?.(options);
  };

  /**
   * Dismisses a specific toast by ID.
   * @param {string} id - The ID of the toast to dismiss.
   */
  const dismissToast = (id: string) => {
    removeToast?.(id);
  };

  /**
   * Generates a random ID for a toast.
   * @returns {string} A random string ID.
   */
  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const alerta: AlertaType = {
    /**
     * Dismisses all toasts.
     */
    dismissAll() {
      clearToasts?.();
    },

    /**
     * Shows a success toast.
     * @param {string} message - The success message.
     * @param {Object} [options] - Optional title, duration, and onClose callback.
     */
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
      });
    },

    /**
     * Shows an error toast.
     * @param {string} message - The error message.
     * @param {Object} [options] - Optional title, duration, and onClose callback.
     */
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
      });
    },

    /**
     * Shows an info toast.
     * @param {string} message - The info message.
     * @param {Object} [options] - Optional title, duration, and onClose callback.
     */
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
      });
    },

    /**
     * Shows a warning toast.
     * @param {string} message - The warning message.
     * @param {Object} [options] - Optional title, duration, and onClose callback.
     */
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
      });
    },
  };

  return { alerta, dismissToast, register };
})();

export default toastManager;
