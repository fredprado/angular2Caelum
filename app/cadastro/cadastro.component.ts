import { Component, OnInit } from '@angular/core';
import { FotoComponent } from '../foto/foto.component'
import { Http, Headers } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { FotoService } from '../foto/foto.service'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  mensagem: string;
  foto: FotoComponent = new FotoComponent();
  title: string = 'Cadastro Pic';
  service: FotoService
  meuForm: FormGroup
  route: ActivatedRoute
  router: Router

  constructor(service: FotoService, fb: FormBuilder, route: ActivatedRoute, router: Router) {
    this.service = service;
    this.route = route;
    this.router = router
    this.meuForm = fb.group({
      titulo: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      url: ['', Validators.required]
    })
    console.log(router)
    this.route.params.subscribe(params => {
      let id = params['id']
      if (id) {
        service.buscaPorId(id).subscribe(foto => {
          this.foto = foto
        });
      }
    });
  }

  cadastrar(event) {

    let headers = new Headers();
    headers.append("Content-Type", "application/json")
    event.preventDefault()


    this.service
      .adiciona(this.foto)
      .subscribe(res => {
        this.mensagem = res.mensagem
        this.foto = new FotoComponent()
        if (!res.inclusao) this.router.navigate([''])
      }, erro => {
        console.log(erro)
        this.mensagem = 'Não foi possível salvar a foto'
      });


  }

  ngOnInit() {
  }

}
