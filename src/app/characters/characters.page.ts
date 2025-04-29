import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonMenuButton, IonButton, IonButtons, IonTitle, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonImg, IonPicker, IonPickerColumn, IonPickerColumnOption, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonMenuButton, IonButton, IonButtons, IonTitle, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonImg, IonPicker, IonPickerColumn, IonPickerColumnOption, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonGrid, IonRow, IonCol]
})
export class CharactersPage implements OnInit {

  constructor(private http: HttpClient) { }

  public url_host: string = "http://localhost:3000/"
  
  public operador = {
    id: '',
    nombre: '',
    genero: '',
    imagen_url: '',
    smashes: 0,
    passes: 0
  };
  public operadores: any[] = [];

  ngOnInit() {
    this.getOperators()
  }


  getOperators() {
    this.http.get<any[]>(this.url_host + 'operadores').subscribe({
      next: (data) => {
        this.operadores = data;
        console.log('Operadores recibidos:', this.operadores);
      },
      error: (err) => {
        console.error('Error al obtener operadores:', err);
      }
    });
  }

}
