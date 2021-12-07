import { Component } from "@angular/core";  //1. primero se importa el componente

@Component({  //2. luego creamos el decorador --> lleva obligatorimante 2 propiedades
    selector: 'mi-componente', //nombre para llamarlo en html -- directiva
    templateUrl: './mi-componente.component.html'       //todo el html que se quiera
}) //no ce cierra con ;
export class MiComponente{

    public titulo:string;
    public comentario:string;
    public year:number;

    constructor(){
        this.titulo = 'Hola mundo, soy mi componente -- 2';
        this.comentario = 'Este es mi primer componente -- 2';
        this.year = 2021;
        console.log('mi componente cargado');
        console.log(this.titulo, this.comentario, this.year);
    }

}