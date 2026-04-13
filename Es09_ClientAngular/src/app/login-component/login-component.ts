import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonService } from '../services/common-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})

export class LoginComponent {
  private commonService: CommonService = inject(CommonService);
  //importiamo oggetto router, che gestisce tutte le route dentro app.route
  private router: Router = inject(Router);
  txtUsername: string = "pippo@gmail.com";
  txtPassword: string = "pippo";
  lblErrore: boolean = false;

  controllaLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      // me li impone a touched poichè la visualizzazione dell'errore è gestita solo se il componente è touched
      Object.values(loginForm.controls).forEach((control: any) => {
        control.markAsTouched();
      });
      return;
    }
    // this.eseguiRichiestaAjax();
    const user: any = {
      "username": this.txtUsername,
      "password": this.txtPassword
    };
    this.commonService.doLogin(user).subscribe({
      "next": (data: any) => {
        //alert("Login ok");
        //vai al path /main -> carica MainComponent
        this.router.navigate(["/main"])
      },
      "error": (error: any) => {
        console.log(error);
        if (error.status == 401) //non autenticato, username o password errati
          this.lblErrore = true;
        else
          alert(error.status + " : " + error.error);
      }
    })
  }

  chiudi() {
    this.lblErrore = false;
  }

  signUp() {
    this.router.navigate(["/registration"])
  }
}
