import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CarrinhoModal} from "./carrinho.modal";
import {ComponentsModule} from "../../commons-module/components.commons.module";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {
    path: '',
    component: CarrinhoModal
  }
];

@NgModule({
  declarations: [
    CarrinhoModal
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    CarrinhoModal,
  ],
})

export class CarrinhoModule {
}
