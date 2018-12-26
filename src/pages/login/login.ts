import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/index.services';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string = '';
  password: string = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private _us: UsuarioProvider) {
  }

  ingresar() {
    this._us.ingresar(this.email, this.password)/*
      .subscribe(() => {
        if (this._us.activo()) {
          this.viewCtrl.dismiss(true);
        }
      })*/;
  }

}
