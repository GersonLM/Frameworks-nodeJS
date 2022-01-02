import { Injectable } from "@angular/core";
import { Pelicula } from "../models/pelicula";

@Injectable()

export class PeliculaService{

    public peliculas!: Pelicula[];

    constructor(){
        this.peliculas = [
            new Pelicula("Wanda", 2021, "https://dam.smashmexico.com.mx/wp-content/uploads/2020/11/Avengers-Bruja-Escarlata-Scarlet-Witch-Historia-de-Marvel-poster.jpg"),
            new Pelicula("Spiderman ", 2019, "https://i.pinimg.com/736x/21/29/95/212995dcf51524f447bcd189c731799f.jpg"),
            new Pelicula("Los Vengadores EndGame", 2021, "https://picfiles.alphacoders.com/458/thumb-458644.jpg"),
            new Pelicula("Batman vrs Superman", 2015, "https://www.cinemascomics.com/wp-content/uploads/2015/07/wpid-553040bb81087-e1478281807810.jpeg?width=1200&enable=upscale"),
            new Pelicula("SpiderGear ", 2020, "https://i.pinimg.com/736x/21/29/95/212995dcf51524f447bcd189c731799f.jpg")
        ]
    }

    holaMundo(){
        return "Hola mundo desde un servicio de Angular";
    }

    getPeliculas(){
        return this.peliculas;
    }
}