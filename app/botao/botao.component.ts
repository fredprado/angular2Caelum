import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'botao',
  templateUrl: './botao.component.html',
  styleUrls: ['./botao.component.css']
})
export class BotaoComponent implements OnInit {

  @Input() nome: string= 'Ok'
  @Input() estilo: string= 'btn-default'
  @Input() tipo: string= 'button'
  @Input() desabilitado: boolean= false;


  constructor() { }

  ngOnInit() {
  }

}
