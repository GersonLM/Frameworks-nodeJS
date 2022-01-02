import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public user: any;
  public campo!: string;

  constructor() { 

    this.user = {
      nombre: '',
      apellidos: '',
      bio: '',
      genero: ''
    };

  }

  ngOnInit(): void {
  }

  onSubmit(){
    alert('Fomrulario enviado');
    console.log(this.user);
  }

  hasDadoClick(){
    alert("has dado click")
  }

  hasSalido(){
    alert("Has salido")
  }

  enter(){
    alert("Has dado enter")
  }
}
