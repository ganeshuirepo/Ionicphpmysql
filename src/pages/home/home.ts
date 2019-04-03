

import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  forgotpswdPage: any;
  registerPage: any;
  loginPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.loginPage = LoginPage;
      this.registerPage = RegisterPage;
      this.forgotpswdPage = ForgotPasswordPage;
  }



}
