import { LastMonthCircularPage } from './../pages/last-month-circular/last-month-circular';
import { DepartmentDisplaycircularPageModule } from './../pages/department-displaycircular/department-displaycircular.module';
import { OldCircularPageModule } from './../pages/old-circular/old-circular.module';
import { HomePageModule } from './../pages/home/home.module';
import { FavdeletePageModule } from './../pages/favdelete/favdelete.module';
import { FavdetailsPageModule } from './../pages/favdetails/favdetails.module';
import { FavinsertPageModule } from './../pages/favinsert/favinsert.module';
import { ForgotPasswordPageModule } from './../pages/forgot-password/forgot-password.module';
import { MasterCircularPageModule } from './../pages/master-circular/master-circular.module';
import { MasterCircularPage } from './../pages/master-circular/master-circular';
import { RegisterPage } from './../pages/register/register';
import { DepartmentListPageModule } from './../pages/department-list/department-list.module';
import { DepartmentListPage } from './../pages/department-list/department-list';
import { WeekcircularPage } from './../pages/weekcircular/weekcircular';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashBoardPage } from './../pages/dash-board/dash-board';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from "@ionic/storage";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MonthcircularPage } from '../pages/monthcircular/monthcircular';
import { SearchcircularPage } from './../pages/searchcircular/searchcircular';
import { TodaycircularPage } from './../pages/todaycircular/todaycircular';
import { LogoutPage } from '../pages/logout/logout';
import { ChangepaswordPage } from '../pages/changepasword/changepasword';
import { HttpModule } from '@angular/http';
import { ChangepaswordPageModule } from '../pages/changepasword/changepasword.module';
import { DashBoardPageModule } from '../pages/dash-board/dash-board.module';
import { LoginPageModule } from '../pages/login/login.module';
import { LogoutPageModule } from '../pages/logout/logout.module';
import { TodaycircularPageModule } from '../pages/todaycircular/todaycircular.module';
import { MonthcircularPageModule } from '../pages/monthcircular/monthcircular.module';
import { SearchcircularPageModule } from '../pages/searchcircular/searchcircular.module';
import { WeekcircularPageModule } from '../pages/weekcircular/weekcircular.module';
//import { changePassword } from '../services/changePassword';
import { RegisterPageModule } from '../pages/register/register.module';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { FavinsertPage } from '../pages/favinsert/favinsert';
import { FavdetailsPage } from '../pages/favdetails/favdetails';
import { FavdeletePage } from '../pages/favdelete/favdelete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { OldCircularPage } from '../pages/old-circular/old-circular';
import { DepartmentDisplaycircularPage } from '../pages/department-displaycircular/department-displaycircular';
import { LastMonthCircularPageModule } from '../pages/last-month-circular/last-month-circular.module';
import { GetCirCountService } from '../Services/getCirCount';
import { GetCirDataService } from '../Services/getCirData';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChangepaswordPageModule,
    HomePageModule,
    OldCircularPageModule,
    DashBoardPageModule,
    DepartmentListPageModule,
    DepartmentDisplaycircularPageModule,
    LoginPageModule,
    LogoutPageModule,
    RegisterPageModule,
    LastMonthCircularPageModule,
    MonthcircularPageModule,
    SearchcircularPageModule,
    TodaycircularPageModule,
    FavinsertPageModule,
    FavdetailsPageModule,
    FavdeletePageModule,
    DepartmentListPageModule,
    WeekcircularPageModule,
    MasterCircularPageModule,
    ForgotPasswordPageModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    DashBoardPage,
    TodaycircularPage,
    MonthcircularPage,
    SearchcircularPage,
    ChangepaswordPage,
    WeekcircularPage,
    OldCircularPage,
    LogoutPage,
    DepartmentListPage,
    RegisterPage,
    MasterCircularPage,
    ForgotPasswordPage,
    FavinsertPage,
    FavdetailsPage,
    FavdeletePage,
    DepartmentListPage,
    LastMonthCircularPage,
    DepartmentDisplaycircularPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    HttpClient,
    GetCirCountService,
    GetCirDataService,
    //changePassword,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
