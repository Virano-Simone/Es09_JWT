import { Component, inject, Input } from '@angular/core';
import { CommonService } from '../services/common-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-component',
  imports: [],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  private commonService = inject(CommonService)
  private router: Router = inject(Router);

  @Input() showLogout: boolean = false;
  logOut() {
    this.commonService.doLogout()?.subscribe({
      next: () => {
        alert("Sessione chiusa correttamente");
        this.router.navigate(["login"]);
      },
      "error": (error: any) => {
        alert(error.status + " : " + error.error);
        this.router.navigate(["login"]);
      }
    })
  }
}
