import { inject, Injectable } from '@angular/core';
import { Cochera } from '../interfaces/cochera';
import { DataAuthService } from './data-auth.service';
import { Estacionamiento } from '../interfaces/estacionamiento';

@Injectable({
  providedIn: 'root'
})
export class DataCocherasService {
  cocheras: Cochera[] = []
  estacionamientos: Estacionamiento[] = []
  authService = inject(DataAuthService);

  constructor() {
    this.loadData()
  }

  async loadData() {
    await this.getCocheras()
    await this.getEstacionamientos()
    this.asociarEstacionamientosConCocheras()
  }

  async getCocheras() {
    const res = await fetch('http://localhost:4000/cocheras', {
      headers: {
        authorization: 'Bearer ' + this.authService.usuario?.token
      },
    })
    if (res.status !== 200) return;
    const resJson: Cochera[] = await res.json();
    this.cocheras = resJson;
  }

  async getEstacionamientos() {
    const res = await fetch('http://localhost:4000/estacionamientos', {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem("authToken")
      },
    })
    if (res.status !== 200) return;
    const resJson: Estacionamiento[] = await res.json();
    this.estacionamientos = resJson;
    console.log(this.estacionamientos)
  }

  asociarEstacionamientosConCocheras() {
    this.cocheras = this.cocheras.map(cochera => {
      const estacionamiento = this.estacionamientos.find(e => e.idCochera === cochera.id && !e.horaEgreso)
      return { ...cochera, estacionamiento }
    });
    console.log(this.cocheras)
  }

  ultimoNumero = this.cocheras[this.cocheras.length - 1]?.id || 0;

  async agregarCochera(nombreCochera: string) {
    const cochera = { "descripcion": nombreCochera };
    const res = await fetch('http://localhost:4000/cocheras', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem("authToken")
      },
      body: JSON.stringify(cochera)
    })
    if (res.status !== 200) {
      console.log("Error en la creación de una nueva cochera",);
    } else {
      console.log("Creación de cochera exitosa",)
      this.loadData();
    };
  }

  async borrarFila(index: number) {
    const res = await fetch(`http://localhost:4000/cocheras/${index}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + this.authService.usuario?.token
      }
    })
    if (res.status !== 200) {
      console.log('Error en la eliminacion de la cochera')
    } else {
      console.log('Cochera eliminada con exito')
      this.loadData()
    }
  }

  async deshabilitarCochera(cocheraId: number) {
    const body = { cocheraId };
    const res = await fetch(`http://localhost:4000/cocheras/${cocheraId}/disable`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem("authToken")
      },
      body: JSON.stringify(body)
    })
    if (res.status !== 200) {
      console.log("Error en abrir estacionamiento")
    } else {
      console.log("Creacion de estacionamiento exitoso")
      this.loadData()
    };
  }

  async habilitarCochera(cocheraId: number) {
    const body = { cocheraId };
    const res = await fetch(`http://localhost:4000/cocheras/${cocheraId}/enable`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem("authToken")
      },
      body: JSON.stringify(body)
    })
    if (res.status !== 200) {
      console.log("Error en habilitar cochera");
    } else {
      console.log("Habilitación de cochera exitosa");
      this.loadData()
    };
  }

  async abrirEstacionamiento(patente: string, idUsuarioIngreso: string, idCochera: number) {
    const body = { patente, idUsuarioIngreso, idCochera };
    const res = await fetch('http://localhost:4000/estacionamientos/abrir', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem("authToken")
      },
      body: JSON.stringify(body)
    })
    if (res.status !== 200) {
      console.log("Error en abrir estacionamiento")
    } else {
      console.log("Creacion de estacionamiento exitoso")
      this.loadData()
    };
  }

  async cerrarEstacionamiento(patente: string, idUsuarioEgreso: string) {
    const body = { patente, idUsuarioEgreso };
    const res = await fetch('http://localhost:4000/estacionamientos/cerrar', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + this.authService.usuario?.token
      },
      body: JSON.stringify(body)
    })
    if (res.status !== 200) {
      console.log("Error en el cerrado del estacionamiento")
    } else {
      console.log("Cerrado del estacionamiento exitoso")
      console.log(res)
      this.loadData();
    };
  }
}