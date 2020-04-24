import { Cancha } from 'src/app/model/establecimiento/cancha';
import { Tarifa } from 'src/app/model/establecimiento/tarifa';

export class Reserva {
    canchaDto:Cancha;
    horaIni:Date;
    horaFin:Date;
    tarifa:Tarifa;
}