export interface Producto {
    id_libro: number;
    nombre: string;
    descripcion: string;
    autor: string;
    editorial: string;
    id_categoria: number;
    precio: number;
    imagen: string;
    existencias: number;
}

export interface CarritoItem {
    id: number;
    nombre: string;
    imagen: string;
    autor: string;
    cantidad: number;
    precio: number;
    total: number;
}
