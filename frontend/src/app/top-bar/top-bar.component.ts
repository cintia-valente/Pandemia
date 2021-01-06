import { Component, OnInit } from '@angular/core';
import {Routes, Route, Router, RoutesRecognized} from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  public links = [
    {
      title:'Dashboard',
      url:''
    },
    {
      title:'Atendimentos',
      url:'/atendimento'
    },
    {
      title:'Pacientes',
      url:'/pacientes'
    },
    {
      title:'Unidades',
      url:'/unidades'
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
