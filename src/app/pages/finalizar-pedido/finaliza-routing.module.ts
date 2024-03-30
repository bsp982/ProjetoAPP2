import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FinalizaPage} from './finaliza.page';


const routes: Routes = [
  {
    path: '',
    component: FinalizaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalizaPageRoutingModule {
}
