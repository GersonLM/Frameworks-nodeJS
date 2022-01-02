import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {

  public nombreParametro!: string ;
  public apellidos!: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
        this.nombreParametro = params["name"];
        this.apellidos = params["apellidos"];
    });
  }

  redireccion(){
    this._router.navigate(['/pagina-de-pruebas', 'Gerson', 'Menjivar']);
  }

}
