import { ProductDescriptionAditional } from "./product_description_aditional.interface";
import { ProductImages } from "./product_images.interface";

export interface Product{
    id: string;
    marcaId: string;
    marcaName: string;
    modeloId: string;
    modeloName: string;
    name: string;
    statusId:string;
    description: string;
    price: number;
    stock: number;
    typeId: string;
    typeName: string;
    descuent:number;
    imgurl:string;
    review:any;
    rating:any;
    datepublication:string;
    datecreate:string;
    images:ProductImages[];
    descripaditionals:ProductDescriptionAditional[]
}