import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { DataAuthService } from '../../services/data-auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-dashboard-container',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule], // Incluyendo CommonModule
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss'] // Corregido styleUrl a styleUrls
})
export class DashboardContainerComponent {
  esAdmin = true; // O ajusta según tu lógica

  constructor(private dataAuthService: DataAuthService, private router: Router) {} // Inyección del servicio de autenticación

  cerrarSesion() {
    this.dataAuthService.cerrarSesion(); // Llama al método de cerrar sesión en el servicio
    console.log('Cerrando sesión...'); // Mensaje para prueba
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
  }
}
