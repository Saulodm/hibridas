import { EnderecoModel } from './../../models/enderecoModel';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  public endereco: EnderecoModel;
  public novo: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.endereco = new EnderecoModel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

}
