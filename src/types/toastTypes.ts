export interface ToastOptions {
  id: string;
  type: string;
  message: string;
  title?: string;
  duration?: number;
  showTimer?: boolean;
  onClose?: () => void;
  position?: string
}
