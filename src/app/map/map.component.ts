import { Component, OnInit, Input, AfterViewInit, OnDestroy, } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @Input() lat!: number;
  @Input() lng!: number;
  @Input() uniqueId!: string; // Asegúrate de que este Input es único para cada mapa

  private map!: L.Map;


  ngAfterViewInit(): void {
    if (!this.map) {
      this.initMap();
    }
  }

  private initMap(): void {
    this.map = L.map(this.uniqueId, {
      center: [this.lat, this.lng],
      zoom: 13,
    });

    // Define un icono personalizado para el marcador
    const myIcon = L.icon({
      iconUrl: 'assets/images/marker-icon.png', // Actualiza esta ruta a la ubicación de tu ícono
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'assets/images/marker-shadow.png', // Actualiza esta ruta a la ubicación de la sombra de tu ícono
      shadowSize: [41, 41],
      shadowAnchor: [12, 41],
    });

    // Agrega un marcador con el ícono personalizado al mapa
    L.marker([this.lat, this.lng], { icon: myIcon }).addTo(this.map);
  

    // Añade la capa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove(); // Esto destruirá la instancia del mapa y evitará errores al reinicializar
    }
  }
}
