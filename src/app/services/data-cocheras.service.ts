import { Injectable, inject } from '@angular/core';
import { iCochera } from '../interfaces/cochera';
import { DataAuthService } from './data-auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataCocherasService {
  cocheras: iCochera[] = [];
  authService = inject(DataAuthService);

  constructor() {
    this.getCocheras(); // Carga inicial de cocheras
  }

  async getCocheras() {
    const res = await fetch('http://localhost:4000/cocheras', {
      headers: {
        authorization: 'Bearer ' + this.authService.usuario?.token
      },
    });
    
    if (res.status !== 200) return;
    
    const resJson: iCochera[] = await res.json();
    this.cocheras = resJson;
  }

  agregarCochera(nuevaCochera: iCochera) {
    // Establecer ID
    nuevaCochera.id = this.cocheras.length ? this.cocheras[this.cocheras.length - 1].id + 1 : 1;
    // Establecer fechas
    nuevaCochera.fechaIngreso = new Date();
    nuevaCochera.horaIngreso = new Date();
    this.cocheras.push(nuevaCochera);
  }

  borrarFila(index: number) {
    this.cocheras.splice(index, 1);
  }
  
  deshabilitarCochera(index: number) {
    this.cocheras[index].deshabilitada = 1;
    this.cocheras[index].minutosOcupados = this.calcularMinutosOcupados(this.cocheras[index].horaIngreso); 
    this.cocheras[index].costo = this.calcularCosto(this.cocheras[index].minutosOcupados); 
  }

  habilitarCochera(index: number) {
    this.cocheras[index].deshabilitada = 0;
    this.cocheras[index].horaIngreso = new Date(); 
  }

  calcularMinutosOcupados(horaIngreso: Date): number {
    const diferencia = new Date().getTime() - new Date(horaIngreso).getTime();
    return Math.floor(diferencia / (1000 * 60)); // Convertir milisegundos a minutos
  }

  calcularCosto(minutosOcupados: number): number {
    const precioPorMinuto = 0.5; // Cambia esto a tu precio deseado
    return minutosOcupados * precioPorMinuto;
  }
}
