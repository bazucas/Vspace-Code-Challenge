import { Component, OnInit } from '@angular/core';
import * as paths from '../../../static/paths.json';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  private readonly Logo = paths.default.logo;
  private isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

}
