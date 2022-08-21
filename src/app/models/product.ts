import { Country } from "./country";
import { Type } from "./type";

export class Product{
    id: number;
    nombre: string;
    tipo: Type;
    precio: number;
    pais: Country;
}