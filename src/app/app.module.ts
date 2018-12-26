import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//storage
import { IonicStorageModule } from '@ionic/storage';

//servicios
import { CarritoProvider, UsuarioProvider, ProductosProvider } from "../providers/index.services"

//Pages
import { CarritoPage, CategoriasPage, LoginPage, OrdenesPage, OrdenesDetallePage, PorCategoriasPage, ProductoPage, TabsPage } from '../pages/index.paginas';

//Pipes
import { ImagenPipe } from '../pipes/imagen/imagen';

@NgModule({
  declarations: [
    MyApp,
    ImagenPipe,
    HomePage,
    CarritoPage, 
    CategoriasPage, 
    LoginPage, 
    OrdenesPage, 
    OrdenesDetallePage, 
    PorCategoriasPage, 
    ProductoPage, 
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CarritoPage, 
    CategoriasPage, 
    LoginPage, 
    OrdenesPage, 
    OrdenesDetallePage, 
    PorCategoriasPage, 
    ProductoPage, 
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ProductosProvider,
    CarritoProvider,
    UsuarioProvider
  ]
})
export class AppModule { }
