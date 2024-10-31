import { Component, inject } from '@angular/core';
import { Estacionamiento } from '../../interfaces/estacionamiento';
import { DataTarifasService } from '../../services/data-tarifas.service';
import Swal from 'sweetalert2';
import { Tarifa } from '../../interfaces/tarifa';

@Component({
  selector: 'app-precios',
  standalone: true,
  imports: [],
  templateUrl: './precios.component.html',
  styleUrl: './precios.component.scss'
})
export class PreciosComponent {
  dataTarifaService = inject(DataTarifasService)

  async editarPrecio(tarifa: Tarifa) {
    const { value: valor } = await Swal.fire({
      title: "Ingrese el nuevo precio",
      input: "text",
      inputLabel: "Ingrese el nuevo precio",
      inputPlaceholder: "Ingrese el nuevo precio"
    });
    if (valor) {
      Swal.fire(`Nuevo precio: ${valor}`);
    }
    this.dataTarifaService.actualizarTarifa(tarifa);
  }
}