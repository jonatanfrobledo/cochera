import { Estacionamiento } from "./estacionamiento";

export interface Cochera {
    id: number;
    descripcion: string;
    deshabilitada: number; 
    eliminada: number; 
    fechaIngreso: Date;
    horaIngreso: Date;
    minutosOcupados: number;
    segundosOcupados: number; 
    horasOcupadas: number; 
    costo: number;
    patente: string; 
    estacionamiento: Estacionamiento | undefined;
  }
  