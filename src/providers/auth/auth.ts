import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

@Injectable()
export class AuthProvider {
  userProfile: Array<any> = [];
  constructor(public events: Events) { }

  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUserCredential => {
        firebase
          .database()
          .ref(`/userProfile/${newUserCredential.user.uid}/email`)
          .set(email);
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    const userId: string = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`/userProfile/${userId}`)
      .off();
    return firebase.auth().signOut();
  }

  getuserdetails() {
    const userId: string = firebase.auth().currentUser.uid;
    var promise = new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`/userProfile/${userId}`)
        .once('value', (snapshot) => {
      resolve(snapshot.val());
    }).catch((err) => {
      reject(err);
      })
    })
    return promise;
  }
  // getuserdetails() {
  //   const userId: string = firebase.auth().currentUser.uid;
  //   firebase.database().ref(`/userProfile/${userId}`).once('value', (snap) => {
  //     this.userProfile = [];
  //     if (snap.val()) {
  //       var tempUser = snap.val();
  //         let userData = {
  //           firstName: tempUser.firstName,
  //           lastName: tempUser.lastName,
  //           telepon: tempUser.telepon,
  //           address: tempUser.address
  //         };

  //         this.userProfile.push(userData);
        
  //     }
  //     this.events.publish('userProfileLoad');
  //   });
  // }
}