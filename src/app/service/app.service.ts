import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Cliente} from "../class/cliente";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  currentUser: Subject<Cliente> = new BehaviorSubject<Cliente>(null);

  constructor() {
  }


  setCurrentUser(usuarioAuth: Cliente) {
    this.currentUser.next(usuarioAuth);
  }


}
