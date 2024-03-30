import {ToastController} from '@ionic/angular';
import {ToastType} from "./toast.type";
import {EnumUtils} from "./enum.utils";

export class PositionToast {
    static TOP = 'top';
    static MIDDLE = 'middle';
    static BOTTOM = 'bottom';
}

export class ToastUtil {

    static toast: any;


    /**
     * PresentToast - https://ionicframework.com/docs/v2/api/components/toast/ToastController/
     *
     * @param toastCtrl - instance of ToastController
     * @param message  string  -  The message fToastUtilor the toast. Long strings will wrap and the toast container will expand.
     * @param position  string  "bottom"  The position of the toast on the screen. Accepted values: "top", "middle", "bottom".
     * @param toastType
     * @param duration  number  -  How many milToastUtilliseconds to wait before hiding the toast. By default, it will show until dismiss() is called.
     * @param dismissOnPageChange  boolean  false  Whether to dismiss the toast when navigating to a new page.
     */
    public static async presentToast(toastCtrl: ToastController,
                                     message: string,
                                     position: PositionToast,
                                     toastType?: ToastType,
                                     duration?: number,
                                     dismissOnPageChange?: boolean): Promise<any> {

        /* Não gerar stack de mútiplas notifications */
        try {
            this.toast.dismiss();
        } catch (e) {
            //avoid error
        }

        this.toast = await toastCtrl.create({
          message: message,
          position:  EnumUtils.valueOf(PositionToast, position),
          duration: duration == null ? 1500 : duration,
          color: toastType == null ? ToastType.INFO.toString() : toastType.toString()
        });
        return this.toast.present();
    }

    public static async presentManualDismissToast(toastCtrl: ToastController,
                                     message: string,
                                     position: PositionToast,
                                     toastType?: ToastType,
                                     showCloseButton?: boolean,
                                     closeButtonText?: string): Promise<any> {

        /* Não gerar stack de mútiplas notifications */
        try {
            this.toast.dismiss();
        } catch (e) {
            //avoid error
        }

      if (showCloseButton) {
        this.toast = await toastCtrl.create({
          message: message,
          position:  EnumUtils.valueOf(PositionToast, position),
          color: toastType == null ? ToastType.INFO.toString() : toastType.toString()
        });
      } else {
        this.toast = await toastCtrl.create({
          message: message,
          position:  EnumUtils.valueOf(PositionToast, position),
          buttons: [
            {
              text: closeButtonText ? closeButtonText : "Fechar",
              role: 'cancel',
              handler: () => {
                //todo ver aqui oq colocar
              }
            }
          ],
          color: toastType == null ? ToastType.INFO.toString() : toastType.toString()
        });
      }
        return this.toast.present();
    }

}
