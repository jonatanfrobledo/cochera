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
  esAdmin = true;
}
