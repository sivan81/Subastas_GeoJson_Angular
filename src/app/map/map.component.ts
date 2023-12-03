import { Component, OnInit, Input, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnChanges, OnDestroy {
  @Input() lat!: number;
  @Input() lng!: number;
  @Input() uniqueId!: string;

  private map!: L.Map;
  private marker!: L.Marker;

  ngOnInit(): void {
    // Inicializa el mapa si es necesario, pero no establezcas el centro o los marcadores aquí
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si el mapa ya está inicializado y las propiedades lat o lng cambian, actualiza el mapa
    if (this.map && (changes['lat'] || changes['lng'])) {
      this.updateMap();
    }
  }

  ngAfterViewInit(): void {
    // Inicializar el mapa en ngAfterViewInit para asegurarse de que el contenedor del mapa esté disponible
    if (!this.map) {
      this.initMap();
    }
  }

  private initMap(): void {
    this.map = L.map(this.uniqueId, {
      center: [this.lat, this.lng],
      zoom: 13,
    });

    const myIcon = L.icon({
      iconUrl: 'assets/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'assets/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [12, 41],
    });

    this.marker = L.marker([this.lat, this.lng], { icon: myIcon });
    this.marker.addTo(this.map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  private updateMap(): void {
    this.map.setView(new L.LatLng(this.lat, this.lng), 13);
    this.marker.setLatLng(new L.LatLng(this.lat, this.lng));
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}


/*
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
    console.log("Valor de uniqueId es: " + this.uniqueId);
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
*/
