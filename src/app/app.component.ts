import { Component, OnInit } from '@angular/core';
import { GeojsonService } from './geojson.service'; // Importa el servicio

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent implements OnInit {
  title = 'MapaSubastas';
  properties: any[] = []; // Aquí almacenaremos las propiedades del geojson

  // Propiedades para la paginación
  currentPage: number = 1; // La página actual
  itemsPerPage: number = 5; // Elementos por página
  itemsPerPageOptions: number[] = [5, 10, 25, 50]; // Almacena las opciones de items por página
  displayedProperties: any[] = []; // Es una lista que contiene las propiedades de los ítems que están siendo mostrados en la página actual. Esta lista se actualiza cuando cambian los ítems mostrados en la página.
  key: number = 1; // Propiedad para forzar la actualización


  constructor(private geojsonService: GeojsonService) {} // Inyecta el servicio


  // Carga de datos
  ngOnInit(): void {  // Este es el método `ngOnInit`. Se ejecuta automáticamente cuando se inicializa un componente en Angular.
    this.geojsonService.getData().subscribe((data) => {  // la función `.subscribe()` manejamos la respuesta cuando es exitosa:
        // Asegúrate de validar y manejar los datos adecuadamente. Aquí, asumimos que siempre hay un array 'features'.
        this.properties = data.features.map((feature: any) => feature.properties);  // Aquí, estamos extrayendo las propiedades de cada 'feature' en los datos. Asumimos que siempre hay un array 'features' en la respuesta.
        this.setPage(1); // Establece la primera página después de cargar los datos
      },
      (error) => {
        console.error('Hubo un error al cargar los datos!', error);
      }
    );
  }

  
  // Método para el cambio de página actual (paginación)
  setPage(page: number) {  // Método llamado `setPage` que toma un número de página como argumento.
    this.currentPage = page;  // Establece la página actual al número que fue pasado como argumento.
    // console.log('currentPage:', this.currentPage);
    const startItem = (this.currentPage - 1) * this.itemsPerPage;  // Calcula el índice del primer elemento que se mostrará en la página actual.
    const endItem = Math.min(this.properties.length,this.currentPage * this.itemsPerPage);  // Calcula el índice del último elemento que se mostrará en la página actual.
    // console.log('startItem:', startItem, 'endItem:', endItem);
    this.displayedProperties = this.properties.slice(startItem, endItem);  // Usando `slice()`, extraemos los elementos que corresponden a la página actual de la lista completa de propiedades.
    this.key++;
  }

  
  // Método que se necesita para poder usar Math en Angular
  getCeil(value: number): number {
    // Toma el valor proporcionado, lo pasa al método `ceil` de la clase Math, 
    // que redondea el número hacia arriba al entero más cercano, y luego devuelve ese valor.
    return Math.ceil(value);
  }
  

  trackByPropertyId(index: number, property: any): string {
    return property.id; // Asume que cada property tiene un campo 'id' único.
  }


  // Método para hacer que los números que se muestren en pantalla, los considere string
  formatNumber(value: any): string {

    // Con esta variable si el valor proporcionado es una cadena intentamos convertirlo a número y si no es cadena, lo dejamos como está
    let numberValue = (typeof value === 'string') ? parseFloat(value) : value;

    // Verificamos si numberValue es de tipo número y no es un valor NaN (no es un número). Es importante antes de formatearlo
    if (typeof numberValue === 'number' && !isNaN(numberValue)) {
        // Si es un número válido, lo convertimos a cadena con formato local para poner los puntos de mil y las comas de decimales
        return numberValue.toLocaleString('es-ES', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
    }
    return String(value);  // Si no es un número, simplemente conviértelo a string.
  }


}
