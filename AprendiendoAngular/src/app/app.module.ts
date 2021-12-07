import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component'; // se utiliza el nombre de la clase para importarlo
import { MiComponente } from './components/mi-componente/mi-componente.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { PruebasComponent } from './components/pruebas/pruebas.component';

@NgModule({
  declarations: [ //cargamos los modulos importados
    AppComponent,
    MiComponente,
    PeliculasComponent,
    PruebasComponent
  ],
  imports: [  // cargamos los ,odulos de la apliacaion
    BrowserModule
  ],
  providers: [], // cargamos los servicios
  bootstrap: [AppComponent] // indicamos el componenete inicial, sobre el cual se cargara la aplicaicon
})
export class AppModule { }
