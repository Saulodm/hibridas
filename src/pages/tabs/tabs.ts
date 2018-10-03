import { CadastroPage } from './../cadastro/cadastro';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab2Root = HomePage;
  tab1Root = CadastroPage;

  cadastro = true;

  constructor() {

  }
}
