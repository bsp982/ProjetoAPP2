import {NgModule} from '@angular/core';
import {CardExpandableComponent} from "./card-expandable-component/card.expandable.component";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    CardExpandableComponent],
  imports: [
    IonicModule,
    CommonModule],
  exports: [
    CardExpandableComponent,
    CommonModule,
    IonicModule],
})

export class ComponentsModule {
}
