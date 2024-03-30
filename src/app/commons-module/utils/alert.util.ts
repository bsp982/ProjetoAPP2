import {AlertController} from '@ionic/angular';
import {EnumUtils} from "../../class/commons-class/enum.utils";

export class AlertTypeEnum {
  static INFO = 'custom-alert custom-alert-info';
  static WARNING = 'custom-alert custom-alert-warning';
  static DANGER = 'custom-alert custom-alert-danger';
  static SUCCESS = 'custom-alert custom-alert-success';
  static PRIMARY = 'custom-alert';
}

export class AlertButtonTypeEnum {
  static INFO = 'custom-alert-button-info';
  static WARNING = 'custom-alert-button-warning';
  static DANGER = 'custom-alert-button-danger';
  static SUCCESS = 'custom-alert-button-success';
  static PRIMARY = 'custom-alert-button';
}

export class AlertButtonSecondaryTypeEnum {
  static PRIMARY = 'custom-alert-button-secondary';
  static INFO = 'custom-alert-button-secondary';
  static WARNING = 'custom-alert-button-secondary';
  static DANGER = 'custom-alert-button-secondary';
  static SUCCESS = 'custom-alert-button-secondary';
}

export class AlertUtil {

  public static confirmExitPage(alertCtrl: AlertController) {
    return new Promise((resolve) => {
      AlertUtil.confirm(alertCtrl, 'Aviso', 'Deseja sair da página?', () => {
        resolve(true);
      }, () => {
        resolve(false);
      });
    },);
  }

  public static async confirmAlert(alertConfig: AlertConfig) {
    this.confirm(alertConfig.alertCtrl, alertConfig.titleMessage, alertConfig.askMessage, alertConfig.successCallback, alertConfig.failCallback,
      EnumUtils.valueOf(AlertTypeEnum, alertConfig.alertCustomCss),
      EnumUtils.valueOf(AlertButtonTypeEnum, alertConfig.alertCustomCssButton),
      EnumUtils.valueOf(AlertButtonSecondaryTypeEnum, alertConfig.alertCustomCssButtonSecondary));

  }

  public static async confirm(alertCtrl: AlertController, titleMessage: string, askMessage: string,
                              successCallback, failCallback?,
                              alertCustomCss: string = 'custom-alert',
                              alertCustomCssButton: string = 'custom-alert-button',
                              alertCustomCssButtonSecondary: string = 'custom-alert-button-secondary') {
    let alert = await alertCtrl.create({
      header: titleMessage,
      message: askMessage,
      cssClass: alertCustomCss,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Não',
          cssClass: alertCustomCssButtonSecondary,
          handler: () => {
            if (failCallback != null) {
              failCallback();
            }
          }
        },
        {
          text: 'Sim',
          cssClass: alertCustomCssButton,
          handler: () => {
            successCallback();
          }
        }
      ]
    });

    await alert.present().catch(() => {
      failCallback();
    });
  }

  public static async showMessage(alertCtrl: AlertController, titleMessage: string, message: string) {
    let alert = await alertCtrl.create({
      header: titleMessage,
      subHeader: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  public static async showMessageCallback(alertCtrl: AlertController, titleMessage: string, message: string, sucessCallback, failCallback?) {
    let alert = await alertCtrl.create({
      header: titleMessage,
      subHeader: message,
      backdropDismiss: true,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            sucessCallback();
          }
        }
      ]
    });

    await alert.present().catch(() => {
      failCallback();
    });
  }

  public static async showError(alertCtrl: AlertController, errorMessage: string) {
    let alert = await alertCtrl.create({
      header: 'Aviso',
      subHeader: errorMessage,
      buttons: ['OK']
    });

    await alert.present();
  }

}

export interface AlertConfig {
  alertCtrl: AlertController;
  titleMessage: string;
  askMessage: string;
  successCallback;
  failCallback?;
  alertCustomCss: AlertTypeEnum;
  alertCustomCssButton: AlertButtonTypeEnum;
  alertCustomCssButtonSecondary: AlertButtonSecondaryTypeEnum;
}
