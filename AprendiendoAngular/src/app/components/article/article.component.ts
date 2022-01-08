import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';
import { catchError, of, tap } from 'rxjs';
import { Global } from '../../services/global'
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {

  public article!: Article;
  public url!: string;

  constructor(
    private _articleService: ArticleService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
      this.url = Global.url
  }

  ngOnInit(): void {

    this._route.params.subscribe(params =>{
      let id = params['id'];

      this._articleService.getArticle(id)
                .pipe(
                  catchError ( error => {
                    this._router.navigate(['/home'])
                    return of([])
                  })
                )
                .subscribe(
                  (articleApi) => {
                    this.article = articleApi.article;
                    console.log(this.article); 
                });
        

    });

  }

}
