import { Component } from '@angular/core';
import { FotoService } from '../foto/foto.service'
import { FotoComponent} from "../foto/foto.component"

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent {
  title: string = 'Caelum Pic';
  fotos: FotoComponent[] = [];
  service: FotoService

  constructor(service:FotoService) {
    this.service = service
    this.service.lista().subscribe(
      fotos => this.fotos = fotos,
      erro => console.log(erro)
    );
  }

  removerFoto(foto){
    this.service.remove(foto._id).subscribe(fotos => {
      let auxFotos = this.fotos.slice(0)
      let index = auxFotos.indexOf(foto)
      auxFotos.splice(index, 1)
      this.fotos = auxFotos
    })
  }
  

}
