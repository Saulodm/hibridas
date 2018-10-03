import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalizacaoModel } from '../../models/localizacaoModel';
/*
  Generated class for the LocationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationServiceProvider {
 private _geolocation: Geolocation
  constructor(private geolocation: Geolocation) {
    console.log('Hello LocationServiceProvider Provider');
    this._geolocation = geolocation;
  }
  getLocation(functionCallback: Function){
    debugger;
    
      this.geolocation.getCurrentPosition().then(pos => {
        debugger;
        let location: LocalizacaoModel = new LocalizacaoModel();
        location.latitude =  pos.coords.latitude
        location.longitude = pos.coords.longitude
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        functionCallback(location);
      });
  }

}
