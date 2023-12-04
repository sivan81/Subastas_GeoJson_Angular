import { Component, OnInit, Input, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnChanges, OnDestroy {
  // Decoradores @Input para recibir valores de latitud, longitud y un identificador único desde el componente padre
  @Input() lat!: number;
  @Input() lng!: number;
  @Input() uniqueId!: string;

  // Propiedades privadas para almacenar la instancia del mapa y el marcador
  private map!: L.Map;
  private marker!: L.Marker;

  ngOnInit(): void {
    // Este método se ejecuta una vez que Angular ha inicializado el componente, pero antes de mostrar la vista
    // No se realiza ninguna acción específica en el mapa en este punto
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Este método se ejecuta cuando Angular detecta cambios en las propiedades de entrada del componente
    // Si el mapa ya está inicializado y las propiedades lat o lng cambian, actualiza el mapa
    if (this.map && (changes['lat'] || changes['lng'])) {
      this.updateMap();
    }
  }

  ngAfterViewInit(): void {
    // Este método se ejecuta después de que Angular haya renderizado completamente la vista del componente
    // Inicializar el mapa aquí asegura que el contenedor del mapa ya está disponible en el DOM
    if (!this.map) {
      this.initMap();
    }
  }

  private initMap(): void {
    // Método para inicializar el mapa Leaflet
    this.map = L.map(this.uniqueId, {
      center: [this.lat, this.lng],
      zoom: 13,
    });

    // Configuración del icono personalizado para el marcador
    const myIcon = L.icon({
      iconUrl: 'assets/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'assets/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [12, 41],
    });

    // Creación del marcador y adición al mapa
    this.marker = L.marker([this.lat, this.lng], { icon: myIcon });
    this.marker.addTo(this.map);

    // Adición de la capa base de OpenStreetMap al mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  private updateMap(): void {
    // Método para actualizar la vista y la posición del marcador en el mapa
    this.map.setView(new L.LatLng(this.lat, this.lng), 13);
    this.marker.setLatLng(new L.LatLng(this.lat, this.lng));
  }

  ngOnDestroy(): void {
    // Este método se ejecuta justo antes de que Angular destruya el componente
    // Se utiliza para limpiar y eliminar la instancia del mapa, evitando fugas de memoria
    if (this.map) {
      this.map.remove();
    }
  }
}


