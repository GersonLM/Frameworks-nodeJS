import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';
import { catchError, of, tap } from 'rxjs';
import { Global } from '../../services/global'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {

  public article!: Article;
  public url!: string;
  public articleId!: string;

  constructor(
    private _articleService: ArticleService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url
  }

  ngOnInit(): void {

    this._route.params.subscribe(params => {
      this.articleId = params['id'];


      this._articleService.getArticle(this.articleId)
        .pipe(
          catchError(error => {
            this.articuloNoEncontrado();
            this._router.navigate(['/home']);
            return of([]);
          })
        )
        .subscribe(
          (articleApi) => {
            this.article = articleApi.article;
            console.log(this.article);
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

  deleteArticle() {
    Swal.fire({
      title: 'Quieres eliminar este Artículo?',
      text: 'Si eliminas el articulo no podras recuperarlo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar el articulo'
    }).then(result => {
      if (result.value) {

        this._articleService.delete(this.articleId)
          .pipe(
            catchError(error => {
              console.log(error);
              Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Error al elimniar el articulo'
              })
              return error;

            })
          )
          .subscribe(
            (articleDelete) => {
              Swal.fire('Eliminado', 'El articulo a sido eliminado de la base de datos', 'success');
              this._router.navigate(['/blog']);

            }
          );
      }
    });

  }

}
