export interface iCochera {
    id: number;
    descripcion: string;
    deshabilitada: number; // 0 para libre, 1 para ocupada
    eliminada: number; // 0 para no eliminada, 1 para eliminada
    fechaIngreso: Date;
    horaIngreso: Date;
    minutosOcupados: number;
    segundosOcupados: number; // Añadir esta línea
    horasOcupadas: number; // Añadir esta línea
    costo: number;
    patente: string; // Campo para la patente
  }
  