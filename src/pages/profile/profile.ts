import { Component } from "@angular/core";
import {
  Alert,
  AlertController,
  IonicPage,
  NavController
} from "ionic-angular";
import { ProfileProvider } from "../../providers/profile/profile";
import { AuthProvider } from "../../providers/auth/auth";
import firebase from "firebase";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  public userProfile: any[];
  public birthDate: string;
  public userDetails:any;
  currentUser: firebase.User;
  cuserUID: string;


  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public profileProvider: ProfileProvider
  ) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.cuserUID = user.uid;
      }
    });
  } 

  save_outage_index(){
    console.log('click');
  }

  ionViewDidLoad() {
    firebase.database().ref(`/userProfile/${this.cuserUID}`).on('value', userProfileSnapshot => {
      this.userDetails = userProfileSnapshot.val();
    });
    // this.profileProvider.getData();
  }

  updateName(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Your first name & last name",
      inputs: [
        {
          name: "firstName",
          placeholder: "Your first name"
        },
        {
          name: "lastName",
          placeholder: "Your last name"
        }
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

  updateDOB(birthDate:string):void {
    this.profileProvider.updateDOB(birthDate);
  }

  updateEmail(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [{ name: 'newEmail', placeholder: 'Your new email' },
      { name: 'password', placeholder: 'Your password', type: 'password' }],
      buttons: [
        { text: 'Cancel' },
        { text: 'Save',
          handler: data => {
            this.profileProvider
              .updateEmail(data.newEmail, data.password)
              .then(() => { console.log('Email Changed Successfully'); })
              .catch(error => { console.log('ERROR: ' + error.message); });
        }}]
    });
    alert.present();
  }
  
  updatePassword(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        { name: 'newPassword', placeholder: 'New password', type: 'password' },
        { name: 'oldPassword', placeholder: 'Old password', type: 'password' }],
      buttons: [
        { text: 'Cancel' },
        { text: 'Save',
          handler: data => {
            this.profileProvider.updatePassword(
              data.newPassword,
              data.oldPassword
            );
          }
        }
      ]
    });
    alert.present();
  }

  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot("LoginPage");
    });
  }


  updateTelepon(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Your Telephone Number",
      inputs: [
        {
          name: "telepon",
          placeholder: "+628xxxxxxx"
        }
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateTelepon(data.telepon);
          }
        }
      ]
    });
    alert.present();
  }

  updateAddress(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Your Address",
      inputs: [
        {
          name: "address",
          placeholder: "Jalan Gatot Subroto"
        }
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateAddress(data.address);
          }
        }
      ]
    });
    alert.present();
  }

}