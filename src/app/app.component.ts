//import { RegisterPage } from './../pages/register/register';
//import { LoginPage } from './../pages/login/login';
import { HomePage } from './../pages/home/home';
//import { LogoutPage } from './../pages/logout/logout';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, NavController, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { DashBoardPage } from './../pages/dash-board/dash-board';
import { ChangepaswordPage } from '../pages/changepasword/changepasword';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: NavController;

  //rootPage: any = HomePage;
  rootPage: any = this.figureOutWhatToLoad();

  pages: any;
  //pages: Array<{title: string, component: any}>;
  title: any = "Welcome to Circular App";
  connectedUsername: any;

  constructor(public platform: Platform, public alertCtrl: AlertController, public statusBar: StatusBar,
              public splashScreen: SplashScreen, public storage: Storage,
              public menu: MenuController, public app: App) {
              platform.registerBackButtonAction(() => {
                let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();
    if (this.nav.canGoBack() && activeView.name !== 'DashBoardPage') {
      this.nav.pop();
    // CHECK IF THE USER IS IN THE ROOT PAGE.
    // IF IT'S NOT THE ROOT, POP A PAGE.
    } else {
      if (activeView.name === 'DashBoardPage') {
        nav.setRoot('DashBoardPage');
      } else {
        platform.exitApp();
      }
      // IF IT'S THE ROOT, EXIT THE APP.
    }

  });
   // console.log("username", this.connectedUsername);
   //  this.storage.get('empname').then((val) => {
   //   this.connectedUsername = val;
   // });
     this.connectedUsername = localStorage.getItem('empname')

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: DashBoardPage, icon: "apps" },
      { title: 'Change Password', component: ChangepaswordPage, icon: "key" },
      //{ title: 'Logout', component: LogoutPage, icon: "log-out" }
     // { title: 'login', component: LoginPage, icon: "log-in" },
     // { title: "Register", component: RegisterPage, icon: "log-out" },
     // { title: 'Home', component: HomePage, icon: "person" }
    ];
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  figureOutWhatToLoad(): any {
    // let loggedIn = window.localStorage.getItem("loggedIn");
    // console.log(this.af.auth.currentUser)
    // if (this.af.auth.currentUser) {
    if (localStorage.getItem("loggedIn")) {
      return DashBoardPage;

    } else {
      return HomePage;
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  click() {
    this.nav.push(HomePage);
    this.menu.close();
  }

showConfirm(i) {
    let confirm = this.alertCtrl.create({
      title: "Confirm",
      message: "Do you want to Log Out?",
      buttons: [
        {
          text: "No",
          handler: () => {}
        },
        {
          text: "Yes",
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    confirm.present();
  }

  logout() {
    localStorage.clear()
    this.nav.setRoot(HomePage);
  }
}
