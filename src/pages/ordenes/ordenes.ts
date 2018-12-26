import { Component } from '@angular/core';
import { NavController, NavParams, NavPush } from 'ionic-angular';
import { CarritoProvider } from '../../providers/index.services';
import { OrdenesDetallePage } from '../ordenes-detalle/ordenes-detalle';

/**
 * Generated class for the OrdenesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {

  ordenesDetalle: OrdenesDetallePage;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _cs: CarritoProvider) {
  }

  ionViewWillEnter() {
    console.log('Cargando ordenes ');
    this._cs.cargar_ordenes();
  }

  goDetail(orden: any) {
    this.navCtrl.push(OrdenesDetallePage, { orden: orden });
  }

}
