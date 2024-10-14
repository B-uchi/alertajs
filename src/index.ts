import ToastBox from "./components/ToastBox";
import toastManager, { AlertaType } from "./toastManager";
import "../style/style.css";

const alerta: AlertaType = toastManager.alerta;

export { ToastBox, alerta };
export default toastManager;