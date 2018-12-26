
import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class UsuarioProvider {

  token: string;
  id_usuario: string;

  constructor(public http: Http,
    private alertCtrl: AlertController,
    private platform: Platform,
    private storage: Storage) {
    console.log('Hello UsuarioProvider Provider');
    this.cargar_storage();
  }

  activo():boolean{
    if(this.token){
      return true;
    } else {
      return false;
    }
      
  }

  ingresar(correo: string, contrasena: string) {

    let data = new URLSearchParams();
    data.append("correo", correo);
    data.append("contrasena", contrasena);

    let url = URL_SERVICIOS + "/login";

    if(correo == "12345" && contrasena == "12345"){
      this.token = "12345asdf";
      this.id_usuario = "21";
      console.log("TRue");
      this.guardar_storage();
      return true;
    } else {
      console.log("FAlse");
    }
    /*return this.http.post(url, data)
      .map(resp => {

        let data_resp = resp.json();
        console.log(data_resp);
        console.log("Error?");

        if (data_resp.error) {
          this.alertCtrl.create({
            title: "Error al iniciar",
            subTitle: data_resp.mensaje,
            buttons: ["OK"]
          }).present();
        } else {
          this.token = data_resp.token;
          this.id_usuario = data_resp.id_usuario;

          //Store credentials
          this.guardar_storage();
        }
      });*/
  }

  cerrar_sesion() {

  }

  private guardar_storage() {
    if (this.platform.is("cordova")) {
      //Device
      this.storage.set('token', this.token);
      this.storage.set('id_usuario', this.id_usuario);
    } else {
      //PC
      if (this.token) {
        localStorage.setItem("token", this.token);
        localStorage.setItem("id_usuario", this.id_usuario);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("id_usuario");
      }
    }
  }

  cargar_storage() {
    let promesa = new Promise((resolve, reject) => {

      if (this.platform.is("cordova")) {
        //Device
        this.storage.ready()
          .then(() => {
            this.storage.get("token")
              .then(token => {
                if (token) {
                  this.token = token;
                }
              })
            this.storage.get("id_usuario")
              .then(id_usuario => {
                if (id_usuario) {
                  this.id_usuario = id_usuario;
                }
                resolve();
              })
          })
      } else {
        //PC
        if (localStorage.getItem("token")) {
          //Item exists
          this.token = localStorage.getItem("token");
          this.id_usuario = localStorage.getItem("id_usuario");
        }
        resolve();
      }
    });
    return promesa;
  }

}