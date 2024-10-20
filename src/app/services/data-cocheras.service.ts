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

  async getCocheras(){
    const res = await fetch('http://localhost:4000/cocheras',{
      headers: {
        authorization:'Bearer '+this.authService.usuario?.token
      },
    })
    if(res.status !== 200) return;
    const resJson:Cochera[] = await res.json();
    this.cocheras = resJson;
  }

  async getEstacionamientos(){
    const res = await fetch('http://localhost:4000/estacionamientos',{
      headers: {
        authorization:'Bearer '+ localStorage.getItem("authToken")
      },
    })
    if(res.status !== 200) return;
    const resJson: Estacionamiento[] = await res.json();
    this.estacionamientos = resJson;
    console.log(this.estacionamientos)
  }

  asociarEstacionamientosConCocheras() {
    this.cocheras = this.cocheras.map(cochera => {
      const estacionamiento = this.estacionamientos.find(e => e.idCochera === cochera.id)
      return {...cochera, estacionamiento}
    });
    console.log(this.cocheras)
  }

  ultimoNumero = this.cocheras[this.cocheras.length-1]?.id || 0;
  //ultimoNumero = this.cocheras.length === 0 ? 0 : this.cocheras[this.cocheras.length-1].numero;
  
  async agregarCochera(){
    const cochera = {"descripcion" : "Agregada por WebApi"};
    const res = await fetch('http://localhost:4000/cocheras',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer '+this.authService.usuario?.token
      },
      body: JSON.stringify(cochera)
    })
    const responseData = await res.json();  // Capturamos el cuerpo de la respuesta para ver más detalles
  if (res.status !== 200 && res.status !== 201) {
    console.log("Error en la creación de una nueva cochera", responseData);
  } else {
    console.log("Creación de cochera exitosa", responseData);
  }
}

  async borrarFila(index:number){
    const res = await fetch(`http://localhost:4000/cocheras/${index}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer '+this.authService.usuario?.token
      }
    })
    if (res.status !== 200) {
      console.log('Error en la eliminacion de la cochera')
    } else {
      console.log('Cochera eliminada con exito')
      this.loadData()
    }
  }

  deshabilitarCochera(index:number){
    this.cocheras[index].deshabilitada = 1;
  }

  habilitarCochera(index:number){
    this.cocheras[index].deshabilitada = 0;
  }

  async abrirEstacionamiento(patente: string, idUsuarioIngreso: string, idCochera: number) {
    const body = {patente, idUsuarioIngreso, idCochera};
    const res = await fetch('http://localhost:4000/estacionamientos/abrir',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer '+ localStorage.getItem("authToken")
      },
      body: JSON.stringify(body)
    })
    if(res.status !== 200) {
      console.log("Error en abrir estacionamiento")
    } else {
      console.log("Creacion de estacionamiento exitoso")
      this.loadData()
    };
  }  

  async cerrarEstacionamiento(patente: string, idUsuarioEgreso: string) {
    const body = {patente, idUsuarioEgreso};
    const res = await fetch('http://localhost:4000/estacionamientos/cerrar',{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer '+this.authService.usuario?.token
      },
      body: JSON.stringify(body)
    })
    if(res.status !== 200) {
      console.log("Error en el cerrado del estacionamiento")
    } else {
      console.log("Cerrado del estacionamiento exitoso")
      console.log(res)
      this.loadData();
    };    
  }
}