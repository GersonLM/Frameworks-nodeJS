import { Component } from '@angular/core';

@Component({    //es un decorador --> es una funcionalidad que se aplica a una clase, y modifica el comportamiento de la clas
  selector: 'app-root', //Etiqueta para poder usarlo en el index
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mi primer web con Angular';
}
