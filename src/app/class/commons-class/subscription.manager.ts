import {Subscription} from "rxjs";
import {UnsubscriptionError} from "rxjs/src/internal/util/UnsubscriptionError";

export class SubscriptionManager {
  protected subscriptions: Subscription[] = [];

  register(subscription: Subscription) {
    if (subscription) {
      this.subscriptions.push(subscription);
    }
  }

  unsubscriptionAll() {
    if (this.subscriptions) {
      let sub = null;
      while (sub = this.subscriptions.pop()) {
        try {
          sub.unsubscribe();
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
}
