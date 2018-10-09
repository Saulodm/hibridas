import { LocalizacaoModel } from './../../models/localizacaoModel';
import { EnderecoModel } from './../../models/enderecoModel';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CasasServiceProvider } from '../../providers/casas-service/casas-service'
import { TabsPage } from '../tabs/tabs';
import { CadastroPage } from '../cadastro/cadastro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public enderecos: EnderecoModel[];
  constructor(public navCtrl: NavController, public casasService: CasasServiceProvider) {

    this.enderecos = casasService.getCasas();
  }

  editar(item: number){
    console.log(item);
    this.navCtrl.push(CadastroPage, {enderecoId: item});
    //this.navCtrl.parent.select(1);
  }

  deletar(item: number){
    this.casasService.deleteCasa(item);
    this.enderecos = this.casasService.getCasas();
  }

}
