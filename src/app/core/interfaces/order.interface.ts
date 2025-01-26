export interface Order {
    id: string;
    firstname: string;
    lastname: string;
    personfullname:string;
    phone: string;
    address: string;
    subtotal: number;
    igv: number;
    total: number;
    distritoId: string;
    distritoProvinceId: string;
    distritoProvinceDepartmentId: string;
    code: string;
    stateId: string;
    stateName: string;
    datepreparation: Date | null;
    dateenvio: Date | null;
    datedelivery: Date | null;
    listdetails: any []; // Cambiar `any` según la estructura de detalles si es conocida

    datecreate:string;

    //Cliente
    clientFullname:string;
    clientPhoto:string;
    clientEmail:string;

    distritoName:string;
    distritoProvinceName:string;
    distritoProvinceDepartmentName:string;

    //Pago
    statepagoName:string;
    statepagoId:string;
    codetransaction: string; // Código único de la transacción
    paymentmethod: "card" | "cash" | "other"; // Método de pago (puedes expandir opciones)
    cardholder: string; // Nombre del titular de la tarjeta
    numbercard: string; // Número de tarjeta enmascarado
    totalmount: number; // Monto total de la transacción

}