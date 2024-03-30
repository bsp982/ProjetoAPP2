import {FormsModule} from '@angular/forms';
import {FinalizaPage} from './finaliza.page';
import {NgModule} from '@angular/core';
import {ComponentsModule} from '../../commons-module/components.commons.module';
import {FinalizaPageRoutingModule} from './finaliza-routing.module';


@NgModule({
  imports: [
    ComponentsModule,
    FormsModule,
    FinalizaPageRoutingModule,
  ],
  declarations: [FinalizaPage]
})

export class FinalizaPageModule {
}
