import { Component, OnInit, inject } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions(): void;   // Se llama el codigo desde Angular, el cual esta en js de la plantilla que esta en assets

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit{

  private sidebarService = inject(SidebarService);

  public currentYear = new Date().getFullYear();

  ngOnInit(): void {
    customInitFunctions();
    this.sidebarService.cargarMenu();
  }

}
