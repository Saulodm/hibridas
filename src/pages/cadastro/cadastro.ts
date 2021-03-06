import { EnderecoModel } from './../../models/enderecoModel';
import { Component } from '@angular/core';
import { NavController, NavParams, Events, LoadingController, AlertController } from 'ionic-angular';
import { LocalizacaoModel } from '../../models/localizacaoModel';
import { CasasServiceProvider } from '../../providers/casas-service/casas-service';

import { Camera, CameraOptions } from "@ionic-native/camera";
import { Platform, ActionSheetController } from 'ionic-angular';
import { LocationServiceProvider } from '../../providers/location-service/location-service';
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

  localizacaoModel: LocalizacaoModel = new LocalizacaoModel()
  public endereco: EnderecoModel;
  public novo: boolean = false;

  currentPhoto: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    public camera: Camera,
    private alertCtrl: AlertController,
    private casasService: CasasServiceProvider,
    private locationService: LocationServiceProvider) {
    debugger;
    this.endereco = new EnderecoModel();

    if (navParams.data == true) {
      this.novo = true;
    }
    if (navParams.get('enderecoId') != null) {
      this.novo = false;
      this.endereco = casasService.getCasa(navParams.get('enderecoId'));
    }
  }

  localizar() {

    try {

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      this.locationService.getLocation(function (data) {
        console.log(data);
      });
      setTimeout(() => {

        loading.dismiss();
      }, 5000);




    }
    catch (e) {
      let alert = this.alertCtrl.create({
        title: 'Erro ao obter localização',
        subTitle: '',
        buttons: ['Dismiss']
      });
      alert.present();
      console.log(e);
    }
  }

  alterar() {
    debugger;
    this.casasService.editarCasa(this.endereco);
    this.limparCadastro();
    this.navCtrl.pop();
  }
  incluir() {
    debugger;
    if (this.enderecoValido()) {
      alert("Campos obrigatórios não preenchidos");
    } else {
      this.casasService.cadastrarCasa(this.endereco);
      this.limparCadastro();
      this.navCtrl.parent.select(0);
    }
  }
  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Albums',
      cssClass: 'action-sheets-basic-page',
      buttons: [

        {
          text: 'Camera',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.getPhoto("foto");
          }
        },
        {
          text: 'Galeria',
          icon: !this.platform.is('ios') ? 'images' : null,
          handler: () => {
            this.getPhoto("Galeria");
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  /**
  * Criamos o método getPhoto que foi declarado na interface. Cada parâmetro aqui é importante e vai definir o funcionamento da câmera. Nesse exemplo vamos tirar uma foto em JPEG e que vai vir como resultado o base64 da imagem em qualidade 100. Em celulares com menos memória é melhor diminuir um pouco a qualidade
  *
  * @param type - photo or gallery
  */
  getPhoto(type: string) {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: type == "foto" ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {

      this.currentPhoto = 'data:image/jpeg;base64,' + imageData;
      this.endereco.fotoBase64 = this.currentPhoto
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
    // This code is necessary for browser


  }
  limparCadastro() {
    this.endereco.cidade = "";
    this.endereco.complemento = "";
    this.endereco.estado = "";
    this.endereco.fotoBase64 = null;
    this.endereco.id = null;
    this.endereco.numero = "";
    this.endereco.rua = "";
  }
  enderecoValido() {
    if (this.endereco.estado == "" || this.endereco.estado == undefined) {
      return true;
    }
    if (this.endereco.numero == "" || this.endereco.numero == undefined) {
      return true;
    }
    if (this.endereco.rua == "" || this.endereco.rua == undefined) {
      return true;
    }
    if (this.endereco.cidade == "" || this.endereco.cidade == undefined) {
      return true;
    }
    return false;
  }

}
