import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    public authService : AuthentificationService,
    private router : Router
  ){}
  ngOnInit(): void {

  }
  handleLogout(){
    this.authService.logout().subscribe({
      next:(data)=>{
this.router.navigateByUrl("/login");
      }
    })
  }
}
