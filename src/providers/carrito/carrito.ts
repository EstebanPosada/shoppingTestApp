import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController, Platform, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map'

//Modal pages
import { CarritoPage, LoginPage } from '../../pages/index.paginas';
import { UsuarioProvider } from '../usuario/usuario';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { ORDER_DATA } from '../../data/datos';



@Injectable()
export class CarritoProvider {

  items: any[] = [];
  total_carrito: number = 0;
  ordenes: any[] = [];

  constructor(public http: Http,
    private alertCtrl: AlertController,
    private platform: Platform,
    private storage: Storage,
    private _us: UsuarioProvider,
    private modalCtrl: ModalController) {
    this.cargar_storage();
    this.actualizar_total();
  }

  remover_item(idx: number) {
    this.items.splice(idx, 1);
    this.guardar_storage();
  }

  realizar_pedido() {
    let data = new URLSearchParams();
    let codigos: string[] = [];

    for (let item of this.items) {
      codigos.push(item.codigo);
    }
    data.append("items", codigos.join(","));
    let url = `${URL_SERVICIOS}/pedidos/realizar_orden/${this._us.token}/${this._us.id_usuario}`;

    this.http.post(url, data)
      .subscribe(resp => {
        let respuesta = resp.json();
        if (respuesta.error) {
          //Show error
          this.alertCtrl.create({
            title: "Error en la orden",
            subTitle: "No data",
            buttons: ["Ok"]
          }).present();
        } else {
          //Succesfully
          this.items = [];
          this.alertCtrl.create({
            title: "Orden realizada!",
            subTitle: "Nos contactaremos proximamente",
            buttons: ["Ok"]
          }).present();
        }
      })
  }

  ver_carrito() {
    let modal: any;
    if (this._us.token) {
      //Show carrito's page
      modal = this.modalCtrl.create(CarritoPage);
    } else {
      //Show login
      modal = this.modalCtrl.create(LoginPage);
    }
    modal.present();
    modal.onDidDismiss((abrirCarrito: boolean) => {
      if (abrirCarrito) {
        this.modalCtrl.create(CarritoPage).present();
      }
    })
  }

  agregar_carrito(item_param: any) {
    for (let item of this.items) {
      if (item.codigo == item_param.codigo) {
        this.alertCtrl.create({
          title: "Item existe",
          subTitle: item_param.producto + " ya se encuentra en su carrito de compra",
          buttons: ["OK"]
        }).present();
        return;
      }
    }
    this.items.push(item_param);
    this.actualizar_total();
    this.guardar_storage();
  }

  private guardar_storage() {
    if (this.platform.is("cordova")) {
      //Device
      this.storage.set('items', this.items);
    } else {
      //PC
      localStorage.setItem("items", JSON.stringify(this.items));
    }
  }

  cargar_storage() {
    let promesa = new Promise((resolve, reject) => {

      if (this.platform.is("cordova")) {
        //Device
        this.storage.ready()
          .then(() => {
            this.storage.get("items")
              .then(items => {
                if (items) {
                  this.items = items;
                }
                resolve();
              })
          })
      } else {
        //PC
        if (localStorage.getItem("items")) {
          //Item exists
          this.items = JSON.parse(localStorage.getItem("items"))
        }
        resolve();
      }
    });
    return promesa;
  }

  actualizar_total() {
    this.total_carrito = 0;
    for (let item of this.items) {
      this.total_carrito += Number(item.precio_compra);
    }
  }

  cargar_ordenes() {
    this.ordenes = ORDER_DATA;
    let url = `${URL_SERVICIOS}/pedidos/obtener_pedidos/${this._us.token}/${this._us.id_usuario}`;

    this.http.get(url)
      .map(resp => resp.json())
      .subscribe(data => {
        if (data.error) {
          //Show error

        } else {
          //Succesfully
          this.ordenes = data.ordenes;
        }
      })
  }
}
