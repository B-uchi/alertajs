import { ToastOptions } from "./types/toastTypes";

// Create a new type that omits the position property from ToastOptions
type UserToastOptions = Omit<ToastOptions, 'position'>;

const toastManager = (() => {
  let addToast: (options: ToastOptions) => void;
  let removeToast: (id: string) => void;

  /**
   * Registers the add and remove functions.
   * @param {function} add - Function to add a toast.
   * @param {function} remove - Function to remove a toast by ID.
   */
  const register = (
    add: typeof addToast,
    remove: typeof removeToast
  ) => {
    addToast = add;
    removeToast = remove;
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

  const alerta = {

    /**
     * Shows a success toast.
     * @param {string} message - The success message.
     * @param {Object} [options] - Optional title, duration, and onClose callback.
     */
    success: (
      message: string,
      { title, duration = 5000, onClose }: Partial<UserToastOptions> = {}
    ) => {
      showToast({
        id: generateRandomId(),
        type: "success",
        message,
        title,
        duration,
        onClose,
        position: 'top-right', // Set position internally
      });
    },

    /**
     * Shows an error toast.
     * @param {string} message - The error message.
     * @param {Object} [options] - Optional title, duration, and onClose callback.
     */
    error: (
      message: string,
      { title, duration = 5000, onClose }: Partial<UserToastOptions> = {}
    ) => {
      showToast({
        id: generateRandomId(),
        type: "error",
        message,
        title,
        duration,
        onClose,
        position: 'top-right', // Set position internally
      });
    },

    /**
     * Shows an info toast.
     * @param {string} message - The info message.
     * @param {Object} [options] - Optional title, duration, and onClose callback.
     */
    info: (
      message: string,
      { title, duration = 5000, onClose }: Partial<UserToastOptions> = {}
    ) => {
      showToast({
        id: generateRandomId(),
        type: "info",
        message,
        title,
        duration,
        onClose,
        position: 'top-right', // Set position internally
      });
    },

    /**
     * Shows a warning toast.
     * @param {string} message - The warning message.
     * @param {Object} [options] - Optional title, duration, and onClose callback.
     */
    warning: (
      message: string,
      { title, duration = 5000, onClose }: Partial<UserToastOptions> = {}
    ) => {
      showToast({
        id: generateRandomId(),
        type: "warning",
        message,
        title,
        duration,
        onClose,
        position: 'top-right', // Set position internally
      });
    },
  };

  return { alerta, dismissToast, register };
})();

export default toastManager;
