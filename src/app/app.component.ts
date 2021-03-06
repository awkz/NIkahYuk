import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebase from 'firebase';
import { CategoryProvider } from '../providers/category/category';


import { HomePage } from '../pages/home/home';
import { CartPage } from '../pages/cart/cart';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // rootPage: any = HomePage;
  rootPage: any;

  pages: Array<{ title: string, component: any }>;
  categories:any[];

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private categoryService:CategoryProvider,
    private events:Events) {
    this.initializeApp();
    

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Keranjang', component: CartPage },
    ];

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = 'LoginPage';
        unsubscribe();
      } else {
        this.rootPage = HomePage;
        unsubscribe();
      }
    });

    this.getCategories();

  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goToCategory(category) {
    this.nav.push('CategoryPage', { category: category })
  }

  getCategories() {
    this.categoryService.getCategories();

    this.events.subscribe('categoryLoaded', () => {
      this.categories = this.categoryService.categories;

    })
  }


}
