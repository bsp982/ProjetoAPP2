export class StringUtil {

  static stringToNumber(value: string): number {
    return this.isEmpty(value) ? null : Number(value);
  }

  static isEmpty(value: string): boolean {
    return value == null;

  }

  /**
   * Remove acentos de caracteres
   * @param  {String} stringComAcento [string que contem os acentos]
   * @return {String}                 [string sem acentos]
   */
  public static removerAcentos(newStringComAcento) {
    var string = newStringComAcento;
    var mapaAcentosHex = {
      a: /[\xE0-\xE6]/g,
      A: /[\xC0-\xC6]/g,
      e: /[\xE8-\xEB]/g,
      E: /[\xC8-\xCB]/g,
      i: /[\xEC-\xEF]/g,
      I: /[\xCC-\xCF]/g,
      o: /[\xF2-\xF6]/g,
      O: /[\xD2-\xD6]/g,
      u: /[\xF9-\xFC]/g,
      U: /[\xD9-\xDC]/g,
      c: /\xE7/g,
      C: /\xC7/g,
      n: /\xF1/g,
      N: /\xD1/g,
    };

    for (var letra in mapaAcentosHex) {
      var expressaoRegular = mapaAcentosHex[letra];
      string = string.replace(expressaoRegular, letra);
    }

    return string;
  }

  public static removerNoDigits(value: string): string {
    if (value) {
      value.replace('[^0-9]', '');
    }
    return value;
  }

  public static decript(origem: string): string {
    let nCount: number = 0;
    let nPos: number;
    let nCharCode: number;
    let nChar: number;


    let sSenhaDecodificada: string = '';
    let tamanho: number = origem.length;
    while (nCount < tamanho) {
      nChar = origem.charCodeAt(0);
      origem = origem.substring(1);
      if (nCount % 2 == 0) {
        nPos = nCount + 1;
      } else {
        nPos = nCount - 1;
      }
      if (nChar % 2 == 0) {
        nCharCode = nChar + 27;
      } else {
        nCharCode = nChar - 33;
      }
      sSenhaDecodificada = sSenhaDecodificada + String.fromCharCode(nCharCode);
      nCount++;
    }
    return sSenhaDecodificada;
  }

  static hasNumber(string) {
    return /\d/.test(string);
  }

  static hasSpecialCharacter(string) {
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(string);
  }

  static formatCpfCnpj(value: string) {
    if (value) {
      if (value.length == 11) {
        return value.substr(0, 3) + '.' + value.substr(3, 3) + '.' + value.substr(6, 3) + '-' + value.substr(9, 2);
      } else if (value.length == 14) {
        return value.substr(0, 2) + '.' + value.substr(2, 3) + '.' + value.substr(5, 3) + '/' + value.substr(8, 4) + '-' + value.substr(12, 2);
      }
    }
    return null;
  }

}


