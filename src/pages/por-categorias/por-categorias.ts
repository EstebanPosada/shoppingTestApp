import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductosProvider } from '../../providers/index.services';
import { ProductoPage } from '../index.paginas';


@Component({
  selector: 'page-por-categorias',
  templateUrl: 'por-categorias.html',
})
export class PorCategoriasPage {

  productoPage = ProductoPage;
  categoria: any = {};
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _ps: ProductosProvider) {
    this.categoria = navParams.get("categoria");
    this._ps.cargar_por_categoria(this.categoria.id);
  }
}
