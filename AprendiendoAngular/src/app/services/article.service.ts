import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable } from 'rxjs';
import { Article } from '../models/article';

@Injectable()

export class ArticleService {
    
    constructor(
        private _http: HttpClient
    ){

    }

    pruebas(){
        return "Soy el servicio de articulos para el blpg";
    }
}