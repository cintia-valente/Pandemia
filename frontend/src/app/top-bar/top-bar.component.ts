import { Component, HostListener, OnInit } from '@angular/core';
import {Routes, Route, Router, RoutesRecognized} from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
