import {AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'card-expandable-component',
  templateUrl: './card.expandable.component.html',
  styleUrls: ['./card.expandable.component.scss']
})
export class CardExpandableComponent implements AfterViewInit {

  @ViewChild('expandWrapper', {read: ElementRef})
  expandWrapper;

  @Input('expanded')
  expanded: boolean = false;

  @Input('showIcon')
  showIcon: boolean = true;

  @Input('colorIcon')
  colorIcon;

  @Input('iconUp')
  iconUp = 'chevron-up-outline';

  @Input('iconDown')
  iconDown = 'chevron-down-outline';

  @Input()
  cardTitle: string = "";

  constructor(public renderer: Renderer2) {
  }

  ngAfterViewInit() {
    this.renderer.setStyle(this.expandWrapper.nativeElement, 'height', 'auto');
  }

}
