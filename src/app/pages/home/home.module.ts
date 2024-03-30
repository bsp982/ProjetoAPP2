import {FormsModule} from '@angular/forms';
import {HomePage} from './home.page';
import {NgModule} from '@angular/core';
import {ComponentsModule} from '../../commons-module/components.commons.module';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    HomePage,
  ],
})

export class HomePageModule {
}
