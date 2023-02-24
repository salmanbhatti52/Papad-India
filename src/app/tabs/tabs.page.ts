import { Component } from '@angular/core';
import { Data } from '../data';
import { Settings } from '../data/settings';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(public data: Data, public settings: Settings) {
  }
  t1 = true;
  t2 = false;
  t3 = false;
  t4 = false;
  t5 = false;

  home(type) {
    this.t1 = true
    this.t2 = false;
    this.t3 = false;
    this.t4 = false;
    this.t5 = false;
  }
  search(type) {
    this.t1 = false
    this.t2 = true;
    this.t3 = false;
    this.t4 = false;
    this.t5 = false;
  }
  categories(type) {
    this.t1 = false
    this.t2 = false;
    this.t3 = true;
    this.t4 = false;
    this.t5 = false;
  }
  cart(type) {
    this.t1 = false
    this.t2 = false;
    this.t3 = false;
    this.t4 = true;
    this.t5 = false;
  }
  account(type) {
    this.t1 = false
    this.t2 = false;
    this.t3 = false;
    this.t4 = false;
    this.t5 = true;

  }

}
