export interface ProductPost{

    id: string; // UUID - Clave primaria
    name: string; // Nombre del producto
    description: string; // Descripción de producto
    price: number; // Precio del producto
    stock: number; // Stock de productos
    imgurl: string; // URL de la imagen
    typeId: string; // UUID - Tipo de productos
    typeName: string; // Tipo de productos
    marcaId: string; // UUID - Marca de productos
    marcaName: string; // Marca de productos
    modeloId: string; // UUID - Modelo de productos
    modeloName: string; // Modelo de productos
  
    datecreate: string; // Fecha de creación en formato "yyyy-MM-dd HH:mm:ss"
    datepublication: string; // Fecha de publicación en formato "yyyy-MM-dd HH:mm:ss"
  
    images: any[]; // Lista de imágenes del producto
    descripaditionals: any[]; // Lista de descripciones adicionales
}

export interface ImgnsxProduct{
    id?:string;
    urlimg:string;
}