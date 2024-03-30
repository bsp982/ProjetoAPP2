export class EnumUtils {

    /* Retorna a string que representa a chave a partir do valor informado
     * Ex.:
     *  enum DiaSemanaEnum {
     *    DOMINGO = "Primeiro Dia",
     *    SEGUNDA = "Segundo Dia",
     *    TERCA = "Terceiro Dia",
     *    QUARTA = "Quarto Dia",
     *    QUINTA = "Quinto Dia",
     *    SEXTA = "Sexto Dia",
     *    SABADO = "Sétimo Dia"
     *  }
     *
     *  getKey(DiaSemanaEnum, "Terceiro Dia") -> "TERCA"
      * */
    public static getKey(type, currentValue): string {
        for (let key in type) {
            if (type[key] == currentValue) {
                return key;
            }
        }
        return null;
    }

    /* Retorna o elemento do Enum(como enum) a partir do valor informado
    *
    * valueOf(DiaSemanaEnum, "Terceiro Dia") -> DiaSemanaEnum.TERCA
    * */
    public static valueOf(type, currentValue): any {
        for (let key in type) {
            if (type[key] == currentValue) {
                return type[key];
            }
        }
        return null;
    }

    /* Retorna um array com todas as chaves(como string) do enum informado
    *
    * keys(DiaSemanaEnum) -> ["DOMINGO", "SEGUNDA", "TERCA", ..., "SABADO"]
    * */

    public static keys(type) {
        const output = [];
        for (let key in type) {
            if (typeof type[key] === 'string') {
                output.push(key);
            }
        }
        return output;
    }

    /* Retorna um array com todos os valores(como string) do enum informado
    *
    * values(DiaSemanaEnum) -> ["Primeiro Dia", "Segundo Dia", ..., "Sétimo Dia"]
    * */
    public static values(type) {
        const output = [];
        for (let key in type) {
            if (typeof type[key] === 'string') {
                output.push(type[key]);
            }
        }
        return output;
    }

    /* Retorna o elemento do Enum(como enum) a partir da chave informada
    *
    * valueOf(DiaSemanaEnum, "TERCA") -> DiaSemanaEnum.TERCA
    * */
    public static valueOfByKey(type, targetKey) {
        for (let key in type) {
            if (key == targetKey) {
                return type[key];
            }
        }
        return null;
    }

}
