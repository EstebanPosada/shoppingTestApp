import { Injectable } from '@angular/core';

import { MOCK_DATA, CAT_DATA } from "../../data/datos"
import { Data } from '../../data/model';
import { HttpModule, Http } from '@angular/http';
import { URL_SERVICIOS } from '../../config/url.servicios';
import 'rxjs/add/operator/map'

@Injectable()
export class ProductosProvider {

  pagina: number = 0;
  productos: any[] = [];
  lineas: any[] = [];
  por_categoria: any[] = [];

    

  constructor(public http: Http) {
    this.productos = MOCK_DATA;
    this.lineas = CAT_DATA;
    this.cargar_todos();
    this.cargar_lineas();
  }

  cargar_todos() {

    /*let promesa = new Promise( (resolve, reject)=> {

    //let url = URL_SERVICIOS + "/productos/todos/" + this.pagina;
    this.http.get(url)
      .subscribe(data => {
        console.log(data);
        if (data.error) {
          //Aqui hay un error
        } else {*/
    //let nuevaData = this.agrupar(this.productos, 2);
    /*
    this.productos.push(...data.productos);
    this.pagina += 1;
  }

  resolve();
})
.map(resp => resp.json())

})*/
    console.log(this.productos);
  }

  cargar_lineas() {
    let url = URL_SERVICIOS + "/lineas";
    this.http.get(url)
      .map(resp => resp.json())
      .subscribe(data => {
        if (data.error) {
          //problemas
        } else {
          this.lineas = data.lineas;
        }
      })
    console.log(this.lineas);
  }

  cargar_por_categoria(categoria: number) {
    let url = URL_SERVICIOS + "/productos/por_tipo/" + categoria;
    this.http.get(url)
      .map(resp => resp.json())
      .subscribe(data => {
        if (data.error) {
          //problemas
        } else {
          this.por_categoria = data.productos;
        }
      })
      this.por_categoria = this.filterByString(this.productos, categoria);
  }

  filterByString(data, s) {
    return data.filter(e => e.linea_id == s);
 }
}
