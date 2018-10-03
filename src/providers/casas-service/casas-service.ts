import { Injectable } from '@angular/core';
import { EnderecoModel } from '../../models/enderecoModel';
import { LocalizacaoModel } from '../../models/localizacaoModel';

/*
  Generated class for the CasasServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CasasServiceProvider {

  private casas: EnderecoModel[] = [];


  constructor() {
    console.log('Hello CasasServiceProvider Provider');

    var endereco = new EnderecoModel();    
    endereco.id = 1;
    endereco.rua = "Bernardo Vasconcelos";
    endereco.cidade = "Belo Horizonte";
    endereco.estado = "MG";
    endereco.complemento = "casa";
    endereco.numero = "1000";
    endereco.localizacao = new LocalizacaoModel();
    endereco.localizacao.latitude = -19.884987
    endereco.localizacao.longitude = -43.942762

    this.casas.push(endereco);

  }
  getCasas() {
    return this.casas; 
  }

  deleteCasa(id: number){
    let casa = this.casas.find(function(e) {
      return e.id == 10;
    })

    this.casas.splice( this.casas.indexOf(casa), 1 );

    
  }
  cadastrarCasa(casa: EnderecoModel){
    if(casa != null){
      casa.id = this.casas[this.casas.length-1].id++;
      if(casa.localizacao == null ){
        casa.localizacao = new LocalizacaoModel();
        casa.localizacao.latitude = 0;
        casa.localizacao.longitude = 0; 
      }
      this.casas.push(casa);
    }
  }
}
