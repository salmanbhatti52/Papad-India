import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-deleteaccount',
  templateUrl: './deleteaccount.page.html',
  styleUrls: ['./deleteaccount.page.scss'],
})
export class DeleteaccountPage implements OnInit {
  Checkboxes = [{ question: 'I concerned about my personal data', isItemChecked: false }, { question: 'I have another account', isItemChecked: false },
  { question: 'I want to remove app from my mobile', isItemChecked: false }, { question: 'I get too many emails', isItemChecked: false }, { question: 'Other', isItemChecked: false }];
  selectquestions = [];
  constructor(public toastController: ToastController) { }

  ngOnInit() {
  }

  verifyEvent(ev: any) {
    console.log(ev);
    if (ev.isItemChecked == true) {
      this.selectquestions.push(ev.question)
      console.log('selectquestions aray', this.selectquestions)
    }
    if (ev.isItemChecked == false) {

      const index = this.selectquestions.indexOf(ev.question);
      if (index > -1) {
        this.selectquestions.splice(index, 1); // 2nd parameter means remove one item only
        console.log('job aray', this.selectquestions)
      }

    }
  }

  delete() {
    if (this.selectquestions.length == 0) {
      this.presentToast('Choose one option atleast');
    } else {
      this.presentToast('Your account will be deleted within 24 hours!')
    }

  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message.replace(/<[^>]*>/g, ''),
      duration: 2000,
      // position: 'top'
    });
    toast.present();
  }


}
