import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {
  
  public titulo: string;

  constructor() { 
    this.titulo = "Peliculas"
  }

  ngOnInit(): void {
  }

  ngDoCheck() {
    console.log("DOCHEK LANXADO")
  }

  cambiarTitulo(){
    this.titulo = "El titulo ha sido cambiado";
    console.log(this.titulo)
  }

  ngOnDestroy(){
    console.log('El componentr se va a eliminar');
  }

}
