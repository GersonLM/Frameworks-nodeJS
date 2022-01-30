import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [ArticleService]
})
export class ArticleNewComponent implements OnInit {

  public article!: Article;
  public status!: string;
  public page_title!: string;
  public is_edit: boolean;
  public url: string;

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
    private _router:Router
  ) {

    this.article = new Article('', '', '','', null);
    this.page_title = "Crear Articulo";
    this.is_edit = false;
    this.url = Global.url;

  }

  ngOnInit(): void {
  }

  imageUpload(data:any){
    this.article.image = data.body.image;
  }

  onSubmit() {
    console.log(this.article)
    this._articleService.create(this.article)
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
          this._router.navigate(['/home']);
        } else {
          this.status = 'error';
        }
      });
  }


}
