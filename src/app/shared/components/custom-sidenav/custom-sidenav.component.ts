import {Component, computed, inject, Input, signal} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatListItem, MatListItemIcon, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {authStore} from "../../../auth/store/authStore";


export type MenuItem = {
  route: string,
  icon: string,
  label: string
}

@Component({
  selector: 'custom-sidenav',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatNavList,
    MatListItem,
    NgForOf,
    MatIcon,
    MatListItemIcon,
    RouterLink,
    NgIf,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css'
})
export class CustomSidenavComponent {

  constructor(
    private router: Router
  ) {
  }

  authStore = inject(authStore);
  sidenavCollapsed = signal(false);
  @Input() set sidebarCollapsed(val : boolean){
    this.sidenavCollapsed.set(val);
  }

  logoSize = computed(() => this.sidenavCollapsed() ? '45px' : '130px');


  menuItems = signal<MenuItem[]>([
    {
      route: 'profile',
      icon: 'account_circle',
      label: 'Profile'
    },
    {
      route: 'watchlist',
      icon: 'bookmark',
      label: 'Watchlist'
    },
    {
      route: 'portfolio',
      icon: 'assessment',
      label: 'Portfolio'
    },
    {
      route: 'wallet',
      icon: 'wallet',
      label: 'Wallet'
    },
    {
      route: 'orders',
      icon: 'paid',
      label: 'Orders'
    }
  ]);

  /* TODO: Make sure either ucc/email exists all the time in the store */
  routeToHome() {
    (this.authStore.ucc()) ? this.router.navigateByUrl("/admin") : this.router.navigateByUrl("");
  }
}
