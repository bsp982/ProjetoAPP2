import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LoginPage} from './login.page';
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {ComponentsModule} from "../../commons-module/components.commons.module";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    LoginPage,
  ],
})

export class LoginPageModule {
}
