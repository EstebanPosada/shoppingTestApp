import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductoPage } from '../index.paginas';
import { ProductosProvider, CarritoProvider, UsuarioProvider } from '../../providers/index.services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  productoPage = ProductoPage;

  constructor(public navCtrl: NavController,
    private _ps: ProductosProvider,
    private _cs: CarritoProvider,
    private _us:UsuarioProvider) {
  }

  siguiente_pagina(infiniteScroll) {
    /*this._ps.cargar_todos()
      .then(() => {
        infiniteScroll.complete();
      })*/
  }

}
