import {Component, inject, OnInit} from '@angular/core';
import {authStore} from "../../auth/store/authStore";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{

  authStore = inject(authStore);

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() :void{
    if(!this.authStore.isAuthenticated()){
     this.authStore.validateToken(true).then(value => {
       // then only load whatever needs to be loaded from server
     });
    }
  }
}
