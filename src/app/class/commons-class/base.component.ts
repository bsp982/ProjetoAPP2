import {Subscription} from 'rxjs';
import {Injector, Input, SimpleChanges} from '@angular/core';
import {AlertController, LoadingController, ModalController, NavController, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {IBaseComponent} from './i.base.component';
import {AppService} from "../../service/app.service";
import {Cliente} from "../cliente";
import {SubscriptionManager} from "./subscription.manager";

export abstract class BaseComponent implements IBaseComponent {

  protected alertCtrl: AlertController;
  protected toastCtrl: ToastController;
  protected navCtrl: NavController;
  protected currentUser: Cliente;
  protected modalCtrl: ModalController;
  protected router: Router;
  protected appService: AppService;
  protected loadingCtrl: LoadingController;
  protected activatedRoute: ActivatedRoute;

  protected subscriptionManager: SubscriptionManager = new SubscriptionManager();

  @Input()
  errorMessages: string[] = [];
  private userSubscription: Subscription;


  constructor(injector: Injector) {
    this.alertCtrl = injector.get(AlertController);
    this.toastCtrl = injector.get(ToastController);
    this.navCtrl = injector.get(NavController);
    this.router = injector.get(Router);
    this.appService = injector.get(AppService);
    this.modalCtrl = injector.get(ModalController);
    this.loadingCtrl = injector.get(LoadingController);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.register(this.appService.currentUser.subscribe(value => {
      this.currentUser = value;
    }));
  }

  register(sub: Subscription){
    this.subscriptionManager.register(sub);
  }

  init() {
  }

  destroy() {
  }

  ngAfterContentChecked(): void {
  }

  ngAfterContentInit(): void {
  }

  ngAfterViewChecked(): void {
  }

  ngAfterViewInit(): void {
  }

  ngDoCheck(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    this.destroy();
  }

  ngOnInit(): void {
    this.init();
  }

}
