import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() lat!: number;
  @Input() lng!: number;
  @Input() uniqueId!: string; // Asegúrate de que este Input es único para cada mapa
  
  private map!: L.Map;
  private mapInitialized: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Revisamos si lat y lng son números válidos y que el ID del mapa se ha establecido
    /*
    if (!isNaN(this.lat) && !isNaN(this.lng) && this.mapId && !this.mapInitialized) {
      this.initMap();
    }
    */
    if (!this.mapInitialized) {
      this.initMap();
    }
  }

  private initMap(): void {
    this.map = L.map(this.uniqueId, {
      center: [this.lat, this.lng],
      zoom: 13
    });

  
    // Define un icono personalizado para el marcador
    const myIcon = L.icon({
      iconUrl: '/src/assets/images/marker-icon.png', // Actualiza esta ruta a la ubicación de tu ícono
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowUrl: '/src/assets/images/marker-shadow.png', // Actualiza esta ruta a la ubicación de la sombra de tu ícono
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });

    // Agrega un marcador con el ícono personalizado al mapa
    L.marker([this.lat, this.lng], {icon: myIcon}).addTo(this.map)
      .bindPopup('La ubicación de la propiedad.');

    // Añade la capa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    /*
    const wmsLayer = L.tileLayer.wms('http://localhost:8080/geoserver/etgeospostgis/wms?service=WMS&version=1.1.0&request=GetMap&layers=etgeospostgis:taba_gdal&styles=&bbox=-18.01710,27.75051,4.25821,43.65357&srs=EPSG:4326&width=768&height=330&format=image/png', {
      layers: '[your-layer-name]',
      format: 'image/png',
      transparent: true,
      version: '1.1.0'
    });

    wmsLayer.addTo(this.map);

    const marker = L.marker([this.lat, this.lng]);
    marker.addTo(this.map).bindPopup('La ubicación de la propiedad');
    */

    this.mapInitialized = true; // Marcar el mapa como inicializado
  }
}

