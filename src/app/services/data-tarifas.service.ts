import { inject, Injectable } from '@angular/core';
import { Tarifa } from '../interfaces/tarifa';
import { DataAuthService } from './data-auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataTarifasService {
  editar(valor: any) {
    throw new Error('Method not implemented.');
  }
  tarifas: Tarifa[] = []
  authService = inject(DataAuthService);

  constructor() {
    this.getTarifas()
  }

  async getTarifas() {
    const res = await fetch(`http://localhost:4000/tarifas`, {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem("authToken")
      },
    })
    if (res.status !== 200) {
      console.log("Error")
    } else {
      this.tarifas = await res.json();
    }
  }

  async actualizarTarifa(tarifa: Tarifa) {
    const body = { valor: tarifa.valor }; // Corregido para crear un objeto con la propiedad 'valor'
    
    try {
      const res = await fetch(`http://localhost:4000/tarifas/${tarifa.id}`, { // Usar comillas invertidas
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + localStorage.getItem("authToken")
        },
        body: JSON.stringify(body)
      });
  
      if (res.status !== 200) {
        const errorData = await res.json(); // Obtener el mensaje de error del servidor
        console.log("Error al actualizar la tarifa:", errorData);
      } else {
        console.log("Actualización de tarifa exitosa");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error); // Manejo de errores de red
    }
  }
}