import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Login, ResLogin } from '../interfaces/login';
import { Register } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class DataAuthService {
  usuario: Usuario | undefined;

  constructor() {}

  async login(loginData: Login) {
    const res = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });
    if (res.status !== 200) return;
    const resJson: ResLogin = await res.json();
    if (!resJson.token) return;

    this.usuario = {
      username: loginData.username,
      token: resJson.token,
      esAdmin: false // Ajusta según tu lógica
    };

    // Almacenar el token en localStorage si es necesario
    localStorage.setItem('userToken', resJson.token);
    return resJson;
  }

  async register(registerData: Register) {
    const res = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(registerData)
    });
    if (res.status !== 201) return;
    return res;
  }

  cerrarSesion() {
    this.usuario = undefined; // Limpiar el usuario almacenado
    localStorage.removeItem('userToken'); // Eliminar el token del almacenamiento local
  }
}