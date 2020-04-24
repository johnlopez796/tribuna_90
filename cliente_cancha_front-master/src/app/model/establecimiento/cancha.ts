import { Tarifa } from 'src/app/model/establecimiento/tarifa';

export class Cancha {
    id: string;
    capacidad: number;
    tipoGrama: string;
    tipoTecho: string;
    tarifa:Tarifa;
}