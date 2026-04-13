import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-component',
  imports: [FormsModule],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css',
})
export class MainComponent {
  public commonService: CommonService = inject(CommonService);
  private router: Router = inject(Router);
  public mailReciver: string = "";
  public mailSubject: string = "";
  public mailMessage: string = "";

  ngOnInit() {
    this.commonService.getMails().subscribe({
      "next": (data: any) => {
        console.log(data);
      },
      "error": (error: any) => {
        console.log(error);
        if (error.status == 403) //unauthorized: token scaduto o non valido (errore forbidden)
          this.router.navigate(["login"]);
        else
          alert(error.status + " : " + error.error);
      }
    })
  }

  sendMail() {
    this.commonService.sendMail(this.mailReciver, this.mailSubject, this.mailMessage).subscribe({
      "next": (data: any) => {
        if (data.ok == 1)
          alert("Mail inviata correttamente");
        else
          alert("Errore nell'invio della mail");
      },
      "error": (error: any) => {
        console.log(error);
        if (error.status == 403) //unauthorized: token scaduto o non valido (errore forbidden)
          this.router.navigate(["/login"]);
        else
          alert(error.status + " : " + error.error);
      }
    })
  }
}