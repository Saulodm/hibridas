import { LocalizacaoModel } from './../../models/localizacaoModel';
import { EnderecoModel } from './../../models/enderecoModel';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public enderecos: EnderecoModel[];
  constructor(public navCtrl: NavController) {

    this.enderecos = [];
    var endereco = new EnderecoModel();    
    endereco.rua = "Bernardo Vasconcelos";
    endereco.cidade = "Belo Horizonte";
    endereco.estado = "MG";
    endereco.complemento = "casa";
    endereco.numero = "1000";
    endereco.localizacao = new LocalizacaoModel();
    endereco.localizacao.latitude = "-19.884987"
    endereco.localizacao.longitude = "-43.942762"
    this.enderecos.push(endereco);
  }

}
