import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { iCochera } from '../../interfaces/cochera';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { DataCocherasService } from '../../services/data-cocheras.service';
import { DataAuthService } from '../../services/data-auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estado-cocheras',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './estado-cocheras.component.html',
  styleUrls: ['./estado-cocheras.component.scss']
})
export class EstadoCocherasComponent implements OnInit {
  authService = inject(DataAuthService);
  esAdmin = true;
  dataCocherasService = inject(DataCocherasService);

  nuevaCochera: iCochera = {
    id: 0,
    descripcion: '-',
    deshabilitada: 0,
    eliminada: 0,
    fechaIngreso: new Date(),
    horaIngreso: new Date(),
    minutosOcupados: 0,
    segundosOcupados: 0, // Inicializa los segundos ocupados
    horasOcupadas: 0, // Inicializa las horas ocupadas
    costo: 0,
    patente: '' // Campo para la patente
  };

  costoPorMinuto: number = 10; // Define el costo por minuto

  ngOnInit() {
    this.contarTiempo(); // Iniciar el contador al cargar el componente
  }

  agregarCochera() {
    // Verificar que la patente esté ingresada
    if (!this.nuevaCochera.patente) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La patente es requerida'
      });
      return;
    }

    // Crear una nueva cochera con la fecha y hora actuales
    const cocheraAgregada: iCochera = {
      id: this.dataCocherasService.cocheras.length + 1, // O como prefieras generar IDs
      descripcion: '-',
      deshabilitada: 1, // Marcar como ocupada al agregar
      eliminada: 0,
      fechaIngreso: new Date(), // Fecha de ingreso actual
      horaIngreso: new Date(),  // Hora de ingreso actual
      minutosOcupados: 0, // Inicialmente 0 minutos ocupados
      segundosOcupados: 0, // Inicialmente 0 segundos ocupados
      horasOcupadas: 0, // Inicialmente 0 horas ocupadas
      costo: 0, // Inicialmente 0 costo
      patente: this.nuevaCochera.patente
    };

    // Agregar cochera al servicio
    this.dataCocherasService.agregarCochera(cocheraAgregada); // Llama al método sin promesas

    // Reiniciar el campo de entrada
    this.nuevaCochera.patente = ''; // Reiniciar patente
  }

  contarTiempo() {
    setInterval(() => {
        this.dataCocherasService.cocheras.forEach(cochera => {
            if (cochera.deshabilitada === 1) { // Solo para ocupadas
                const tiempoTranscurrido = new Date().getTime() - cochera.horaIngreso.getTime();
                cochera.minutosOcupados = Math.floor(tiempoTranscurrido / 60000);
                cochera.segundosOcupados = Math.floor((tiempoTranscurrido % 60000) / 1000);
                cochera.horasOcupadas = Math.floor(tiempoTranscurrido / 3600000);
                cochera.costo = cochera.minutosOcupados * this.costoPorMinuto; // Calcula el costo basado en minutos ocupados
            }
        });
    }, 1000); // Actualiza cada segundo para reflejar el tiempo exacto
}

  borrarFila(index: number) {
    this.dataCocherasService.borrarFila(index);
  }

  deshabilitarCochera(index: number) {
    this.dataCocherasService.deshabilitarCochera(index);
  }

  habilitarCochera(index: number) {
    this.dataCocherasService.habilitarCochera(index);
  }

  preguntarBorrarCochera(cocheraId: number) {
    Swal.fire({
      title: "¿Quieres eliminar esta cochera?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `No eliminar`
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.borrarFila(cocheraId);
        Swal.fire("¡Eliminado!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("No se eliminó la cochera", "", "info");
      }
    });
  }
}
