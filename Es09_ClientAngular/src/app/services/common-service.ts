import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DataStorageService } from './data-storage-service';

@Injectable({
  providedIn: 'root',
})

export class CommonService {
  public dataStorageService: DataStorageService = inject(DataStorageService)
  public mailList: any = [];

  doLogin(user: any): Observable<any> {
    //pipe: quando i dati erriveranno dal server li intercetto prima di restituirli al chiamante
    //tap: legge i dati
    // facciamo chiamata POST in modo che i parametri non vengano accodati alla url rendendo il tutto più sicuro
    return this.dataStorageService.InviaRichiesta("POST", "/login", user)!;
  }

  getMails(): Observable<any> {
    return this.dataStorageService.InviaRichiesta("GET", "/mails")!
      .pipe(tap((data: any) => {
        this.mailList = data.mail
      }));
  }

  sendMail(mailReciver: string, mailSubject: string, mailMessage: string): Observable<any> {
    return this.dataStorageService.InviaRichiesta("POST", "/sendMail", {
      mailReciver, mailSubject, mailMessage
    })!;
  }

  doLogout() {
    return this.dataStorageService.InviaRichiesta("POST", "/logout")!
  }
}
