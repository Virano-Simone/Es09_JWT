import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header-component/header-component";
import { MainComponent } from './main-component/main-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  public showLogout: boolean = false;
  //l'evento activate della pagina principale viene generato tutte le volte
  //che cambia la route (quindi cambia componente da visualizzare)
  //e all'evento viene iniettato automaticamente il componente caricato
  onActivate(component: any) {
    //restituisce true se component è un'istanza di MainComponent
    this.showLogout = component instanceof MainComponent;
  }

}
