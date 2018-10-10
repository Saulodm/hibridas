import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalizacaoModel } from '../../models/localizacaoModel';
import { GeocoderRequest, Geocoder, BaseArrayClass, GeocoderResult } from '@ionic-native/google-maps';
import { NativeGeocoder,
  NativeGeocoderReverseResult,
  NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
  import { Platform} from 'ionic-angular';
/*
  Generated class for the LocationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationServiceProvider {
 private _geolocation: Geolocation
  constructor(private platform: Platform , private geolocation: Geolocation, private _GEOCODE  : NativeGeocoder) {
    console.log('Hello LocationServiceProvider Provider');
    this._geolocation = geolocation;
  }
  getLocation(functionCallback: Function){
    debugger;
    if(this.platform.is('cordova')){
      this.geolocation.getCurrentPosition().then(pos => {
        debugger;
        let location: LocalizacaoModel = new LocalizacaoModel();
        location.latitude =  pos.coords.latitude
        location.longitude = pos.coords.longitude
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);

        let options: GeocoderRequest = {
          position:  {"lat": location.latitude, "lng": location.longitude}
        };
        // latitude,longitude -> address
        Geocoder.geocode(options)
        .then((mvcArray: BaseArrayClass<GeocoderResult[]>) => {
          mvcArray.one('finish').then(() => {
            functionCallback(location);
          });
        })
      });
    }
  }

     /**
     *
     * Perform reverseGeocoding operation and return address details
     *
     * @public
     * @method reverseGeocode
     * @return {Promise}
     *
     */
    reverseGeocode(lat : number, lng : number) : Promise<any>
    {
       return new Promise((resolve, reject) =>
       {
          this._GEOCODE.reverseGeocode(lat, lng)
          .then((result : NativeGeocoderReverseResult[]) =>
          {
             let str : string   = `The reverseGeocode address is ${result[0].administrativeArea} in ${result[0].subAdministrativeArea}`;
             resolve(str);
          })
          .catch((error: any) =>
          {
             console.log(error);
             reject(error);
          });
       });
    }
 

}
