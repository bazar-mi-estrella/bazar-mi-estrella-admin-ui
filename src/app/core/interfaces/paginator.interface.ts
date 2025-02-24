export interface Paginator{
    totalPages:number; // Total de páginas
    totalElement:number; // Total de elementos
    size:number; // Tamaño por página
    number	:number; // Número de página actual
    startIndex:number; // Índice de inicio
    endIndex:number; // Índice final
}