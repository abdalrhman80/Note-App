import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() sidebarVisible!: boolean;
  @Output() sidebarVisibleChange = new EventEmitter<any>();
  isLogin: boolean = false
  constructor(
    public _AuthenticationService: AuthenticationService,
    public _Router: Router
  ) { }
  ngOnInit(): void {
    this._AuthenticationService.userLogin.subscribe({
      next: () => this._AuthenticationService.userLogin.getValue() ?
        this.isLogin = true : this.isLogin = false
    })
  }
  hideSidebar() {
    this.sidebarVisibleChange.emit(this.sidebarVisible);
  }
  signOut() {
    this._AuthenticationService.signOut()
    this.sidebarVisible = false
    
  }
}
