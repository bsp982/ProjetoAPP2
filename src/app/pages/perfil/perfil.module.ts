import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {PerfilPage} from './perfil.page';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {ComponentsModule} from '../../commons-module/components.commons.module';

const routes: Routes = [
  {
    path: '',
    component: PerfilPage
  }
];


@NgModule({
  declarations: [
    PerfilPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    PerfilPage,
  ],
})


export class PerfilPageModule {
}
