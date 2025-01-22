export const Constants = {
    REGEX_LETTERS_AND_SPECIAL: /^[a-zA-Z_áéíóúäëïöüÁÉÍÓÚñÑÄËÏÖÜ".,'`-\s]*$/,
    REGEX_ALPHANUMERIC_AND_SPECIAL: /^[a-zA-Z0-9áéíóúäëïöüÁÉÍÓÚñÑÄËÏÖÜ_()&".,'`-\s]*$/,
    REGEX_NUMBER_NOT_ONLY_ZEROS: /^(?!0+$)\d+$/,
    REGEX_DECIMAL_NUMBER: /^\d+(\.\d+)?$/,
    REGEX_NOT_START_BLANK: /^\S/,


    //Prefijo 4 (Estados del cliente)
    PREFIX_STATE_CLIENT:4,
    ESTADO_CLIENTE_ACTIVO: "bc353a3e-f975-45a7-91cd-ad6f74e80ac5",
    ESTADO_CLIENTE_INACTIVO: "43da6e29-158b-4c12-aaee-bb49a63024d3",

    PREFIX_STATE_ORDER:5,
    STATE_ORDER_PREPARING_SHIPMENT:"91b0c3af-e133-4ea4-9128-771ee336345f"
}