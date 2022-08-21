import { Pais } from "./country";
import { Tipo } from "./type";

export class Product{
    id: number;
    nombre: string;
    tipo: Tipo;
    precio: number;
    pais: Pais;
}