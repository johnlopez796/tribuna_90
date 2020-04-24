import { Cancha } from 'src/app/model/establecimiento/cancha';
import { Point } from 'src/app/model/establecimiento/point';

export class Establecimiento {
    id: string;
    numeroCanchas: number;
    nombre: string;
    ubicacion: string;
    horaCierre: string;
    horaApertura: string;
    cancha: Cancha[];
    location:Point;
}