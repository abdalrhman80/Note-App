import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  sidebarVisible: boolean = false;
  toggleSidebar(event: any) {
    this.sidebarVisible = event
  }
}
