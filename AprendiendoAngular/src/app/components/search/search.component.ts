import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from '../../models/article';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { catchError, of } from 'rxjs';
import Swal from 'sweetalert2';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ArticleService]
})
export class SearchComponent implements OnInit {
  public articles!: Article[];
  public search!: string;

  constructor(
    private _articleService: ArticleService,
    private _router: Router,
    private _route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let searchParams = params['search'];
      this.search = searchParams;
      this._articleService.search(searchParams)
            .pipe(
              catchError(error =>{
                this.articuloNoEncontrado();
                console.log('--------------');
                console.log(error);
                console.log('--------------');
                return this.articles = [];
              })
            )
            .subscribe(article => {
              if(article.articles){
                this.articles = article.articles;
              }else{
                this.articles = [];
              }

            });

    });
  }

  articuloNoEncontrado() {
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: 'Articulo no encontrado',
    })
  }

}
