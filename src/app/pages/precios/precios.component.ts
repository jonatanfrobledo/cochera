import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-precios',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './precios.component.html',
  styleUrl: './precios.component.scss'
})
export class PreciosComponent {
  hiddenMessage = true;

  showComingSoon() {
    this.hiddenMessage = false; // Muestra el mensaje

    setTimeout(() => {
      this.hiddenMessage = true; // Oculta el mensaje después de 3 segundos
    }, 3000);
  }
}