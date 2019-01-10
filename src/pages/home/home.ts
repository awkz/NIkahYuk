import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToProfile(): void {
    this.navCtrl.push(this.newMethod());
  }


  private newMethod() {
    return "ProfilePage";
  }
}
