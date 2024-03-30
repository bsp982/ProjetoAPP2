import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RecoveryPasswordPage} from './recovery.password.page';
import {ComponentsModule} from "../../commons-module/components.commons.module";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {
    path: '',
    component: RecoveryPasswordPage
  }
];

@NgModule({
  declarations: [
    RecoveryPasswordPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RecoveryPasswordPage,
  ],
})
export class RecoveryPasswordPageModule {
}
