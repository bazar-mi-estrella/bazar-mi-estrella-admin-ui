import { SweetAlertOptions } from "sweetalert2";

// Función para generar la configuración del modal
export class SweetAlertUtil {

    static getAlertConfig(  code: string,message: string): SweetAlertOptions {
        let title=code == '1' ? 'Exitoso' : 'Advertencia'
        return {
            title: title,         // Parámetro dinámico para el título
            text: message,        // Parámetro dinámico para el mensaje
            width: 400,
            icon: code == '1' ? 'success' : 'warning',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: 'black',
            allowOutsideClick: false, // No permite cerrar haciendo clic fuera
            allowEscapeKey: false,
            customClass: {
                title: 'small-title',
                popup: 'small-popup',
                confirmButton: 'small-button'
            }
        };
    };
}
