import {Component, computed, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatAnchor, MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {CustomSidenavComponent} from "./shared/components/custom-sidenav/custom-sidenav.component";
import {NgIf, NgStyle} from "@angular/common";
import {MatCardSubtitle} from "@angular/material/card";
import {authStore} from "./auth/store/authStore";
import {CandleStick} from "./shared/models/candlestick.model";
import {Observable} from "rxjs";
import {DxChartModule} from "devextreme-angular";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatIcon,
    MatIconButton,
    MatToolbar,
    CustomSidenavComponent,
    NgStyle,
    MatCardSubtitle,
    NgIf,
    MatAnchor,
    DxChartModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


  sidebarCollapsed = signal(true);
  sidenavWidth = computed(() => this.sidebarCollapsed() ? '57px' :'180px');
  authStore = inject(authStore);

  async logout() {
    await this.authStore.onLogout();
  }

  protected readonly localStorage = localStorage;
}
