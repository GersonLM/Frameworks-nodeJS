import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService]
})
export class ArticleEditComponent implements OnInit {

  public article!: Article;
  public status!: string;
  public is_edit!: boolean;
  public page_title!: string;
  public articleId!: string;
  public url!: string;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg, .png, .gif, .jpeg",
    uploadAPI: {
      url: Global.url + "upload-image/"
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      attachPinBtn: 'sube la imagen para el articulo',
    }
  };


  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = Global.url
    this.article = new Article('', '', '', '', null);
    this.is_edit = true;
    this.page_title = "Editar Articulo";
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.articleId = params['id'];


      this._articleService.getArticle(this.articleId)
        .pipe(
          catchError(error => {
            this._router.navigate(['/home']);
            return error;
          })
        )
        .subscribe(
          (articleApi) => {
            this.article = articleApi.article;
            console.log(this.article);
          });
    });


  }

  imageUpload(data: any) {
    this.article.image = data.body.image;
  }

  onSubmit() {
    console.log(this.article)
    this._articleService.update(this.articleId, this.article)
      .pipe(
        catchError(error => {
          console.log(error);
          this.status = "error"
          return this.status;
        })
      )
      .subscribe(response => {
        if (response.status == "succes") {
          this.status = 'success';
          this.article = response.article;
          
          this._router.navigate(['/blog/articulo/',this.articleId]);
        } else {
          this.status = 'error';
        }
      });
  }
}
