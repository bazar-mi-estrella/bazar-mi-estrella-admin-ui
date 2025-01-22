export interface Order {
    id: string;
    firstname: string;
    lastname: string;
    clientfullname:string;
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
}