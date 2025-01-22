export interface Client {
    null: null; // No parece necesario, pero lo dejo por consistencia
    districtName: string | null;
    email: string;
    fullname: string;
    id: string;
    lastname: string | null;
    name: string | null;
    photo: string;
    stateName: string;
    address:string;
}