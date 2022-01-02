import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Pelicula } from '../../models/pelicula'
import { PeliculaService } from '../../services/pelicula.service'
@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  providers: [PeliculaService]
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {
  
  public titulo: string;
  public peliculas!: Array<Pelicula>;
  public favorita!: Pelicula;
  public fecha: any;

  constructor(

    private _peliculaService: PeliculaService

  ) { 
    this.titulo = "Peliculas"
    this.peliculas = this._peliculaService.getPeliculas();
    this.fecha = new Date(2021,9,5);
  }

  ngOnInit(): void {
    console.log(this._peliculaService.holaMundo());
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

  mostrarFavorita(event:any){
    this.favorita = event.pelicula;
  }

}
