import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { AuthProvider } from '../providers/auth/auth';
import { ProfileProvider } from '../providers/profile/profile';
import { ProductsProvider } from '../providers/products/products';
import { CategoryProvider } from '../providers/category/category';
import { CartProvider } from '../providers/cart/cart';
import { OrderProvider } from '../providers/order/order';

import * as firebase from 'firebase';
import { firebaseConfig } from './credentials';
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativePageTransitions,
    AuthProvider,
    ProfileProvider,
    ProductsProvider,
    CategoryProvider,
    CartProvider,
    OrderProvider  
  ]
})
export class AppModule {}
