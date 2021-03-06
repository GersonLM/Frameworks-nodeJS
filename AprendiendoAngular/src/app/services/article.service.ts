import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { Article } from '../models/article';
import { Global } from './global';



@Injectable()

export class ArticleService {
    
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    pruebas(){
        return "Soy el servicio de articulos para el blpg";
    }

    getArticles(last:any = null):Observable<any>{

        let articles = 'articles';
        
        if(last != null){
            articles = 'articles/true'
        }

        return this._http.get(this.url + articles);
        
    }

    getArticle(articleId:any): Observable<any>{
        return this._http.get(this.url + 'article/' + articleId)
    }

    search(searchString:any):Observable<any>{
        return this._http.get(this.url + 'search/' + searchString)
    }

    create(article:Article):Observable<any>{
        let params = JSON.stringify(article);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'save', params, {headers: headers});
    }

    delete(articleId:any):Observable<any>{
        return this._http.delete(this.url + 'article-delete/'+ articleId)
    }

    update(articleId:any, article:Article):Observable<any>{
        let params = JSON.stringify(article);
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.put(this.url + 'article-update/'+articleId, params, {headers: headers});
    }
}