import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CarritoProvider } from '../../providers/index.services';

@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {
  producto: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _cs:CarritoProvider) {
    this.producto = navParams.get('producto');
  }
}
