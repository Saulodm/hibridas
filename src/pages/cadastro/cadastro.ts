import { EnderecoModel } from './../../models/enderecoModel';
import { Component } from '@angular/core';
import { NavController, NavParams, Events, LoadingController, AlertController } from 'ionic-angular';
import { LocalizacaoModel } from '../../models/localizacaoModel';
import { CasasServiceProvider } from '../../providers/casas-service/casas-service';
import {
  LocationService,
  MyLocation,
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
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
  localizacaoModel:LocalizacaoModel = new LocalizacaoModel()
  public endereco: EnderecoModel;
  public novo: boolean = false;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public loadingCtrl: LoadingController,
     private alertCtrl: AlertController,
     private casasService: CasasServiceProvider) {

    this.endereco = new EnderecoModel();

    if (navParams.data == true){
      this.novo = true;
    }
    else{
      this.novo = false;
    }
  }

  localizar(){   

    try{

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
    
      loading.present();
    
      setTimeout(() => {
        
        loading.dismiss();
      }, 5000);

      LocationService.getMyLocation().then((myLocation: MyLocation) => {

       console.log(myLocation);
  
      });

      
    }
    catch(e){
      let alert = this.alertCtrl.create({
        title: 'Erro ao obter localização',
        subTitle: '',
        buttons: ['Dismiss']
      });
      alert.present();
       console.log(e); 
    }
  }

  alterar(){
    debugger;
    this.casasService.cadastrarCasa(this.endereco);
    this.navCtrl.parent.select(0);
  }
  incluir(){
    debugger;
    this.casasService.cadastrarCasa(this.endereco);
    this.navCtrl.parent.select(0);
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
    // This code is necessary for browser
 

  }

}
