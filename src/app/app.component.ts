
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonHeader, IonToolbar, IonMenuButton, IonButton, IonButtons, IonTitle, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, homeSharp, cashOutline } from 'ionicons/icons';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonTitle, IonButton, IonMenuButton, IonButtons, IonToolbar, IonHeader, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})

export class AppComponent {
  public appPages = [
    { title: 'Main', url: '/main', icon: 'home' },
    { title: 'Characters', url: '/characters', icon: 'home' }
  ];

  public labels = [];

  constructor() {
    addIcons({ homeSharp, cashOutline });
  }

  ngOnInIt(){
  }
}

