import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    DoCheck,
    OnChanges,
    OnDestroy,
    OnInit
} from '@angular/core';

export interface IBaseComponent extends AfterViewInit, OnInit, OnChanges, DoCheck, AfterContentInit,
    AfterContentChecked, OnDestroy, AfterViewChecked {

    init();

    destroy();

}
