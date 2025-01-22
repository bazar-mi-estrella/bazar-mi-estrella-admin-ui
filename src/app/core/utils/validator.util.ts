import { AbstractControl } from "@angular/forms";

/**
 * Clase para validaciones de inputs
 *
 * @export
 * @class ValidatorUtil
 */
export class ValidatorUtil {

  // Validar un input al escribir
  public static onInputValidate(control: AbstractControl, regexs: RegExp[], maxLength: number) {
    const val = control.value?.toString();
    const array = val?.toString().split('.');

    if (val) {
      const exceedsMaxLength = val.length > maxLength;
      const failsRegexTest = !regexs.every(x => x.test(val));
      const invalidDecimalPart = array && array.length > 1 && array[1].length >= 3;
      const endsWithDoubleSpace = val.endsWith('  ');

      if (exceedsMaxLength || failsRegexTest || invalidDecimalPart || endsWithDoubleSpace) {
        control.setValue(val.slice(0, -1));
      }
    }
  }

  // Validar un input al pegar
  public static onPasteValidate(event: ClipboardEvent, control: AbstractControl, regexs: RegExp[], maxlength: number) {
    const valor: string = `${event.clipboardData?.getData('text')}${control?.value?.toString() || ''}`;
    const respt: boolean = regexs.every(x => x.test(valor));
    try {
      if (
        respt === false ||
        valor.length > maxlength ||
        valor.endsWith('  ') ||
        valor.includes('  ')
      )
        event.preventDefault();
    } catch (error) {
      event.preventDefault();
    }
  }


  public static onInputDecimal(event: Event, control: AbstractControl, maxDecimales: number = 2): void {
    const inputElement = event.target as HTMLInputElement;
    let valor = inputElement.value;

    // Reemplaza los puntos adicionales, dejando solo el primer punto
    const puntos = valor.split('.');

    if (puntos.length > 2) {
      valor = puntos[0] + '.' + puntos.slice(1).join('');
    }

    // Regex para permitir solo un punto y hasta maxDecimales decimales
    const regex = new RegExp(`^\\d*(\\.\\d{0,${maxDecimales}})?$`);

    if (!regex.test(valor)) {
      // Si la entrada no es válida, eliminamos el último carácter ingresado
      valor = valor.slice(0, -1);
    }

    inputElement.value = valor;
    control.setValue(valor, { emitEvent: false });
  }
}
