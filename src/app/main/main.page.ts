import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonMenuButton, IonButton, IonButtons, IonTitle, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonImg, IonPicker, IonPickerColumn, IonPickerColumnOption, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonGrid, IonRow, IonCol, IonSelectOption, IonSelect } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonMenuButton, IonButton, IonButtons, IonTitle, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonImg, IonPicker, IonPickerColumn, IonPickerColumnOption, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonGrid, IonRow, IonCol, IonSelectOption, IonSelect]
})
export class MainPage implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  public url_host: string = "http://localhost:3000/"
  
  public operador = {
    id: '',
    nombre: '',
    genero: '',
    imagen_url: '',
    smashes: 0,
    passes: 0
  };
  public operadorAnterior: any = null;
  public operadores: any[] = [];
  public currentIndex: number = 0;
  public generoSeleccionado: string = 'mixto';
  public idsVotados: number[] = [];
  public juegoTerminado: boolean = false;



  

  ngOnInit() {
    let idsGuardados = JSON.parse(localStorage.getItem('idsVotados') as string);
    if (idsGuardados != null) {
      this.idsVotados = idsGuardados;
      console.log('IDs votados existentes:', this.idsVotados);
    } else {
      this.idsVotados = [];
      localStorage.setItem('idsVotados', JSON.stringify(this.idsVotados));
      console.log('Inicializado localStorage de votos vacío.');
    }
    this.getOperador();
  }


  getOperador() {
    let url = '';
    if (this.generoSeleccionado === 'hombres') {
      url = this.url_host + 'operadoresMasculinos';
    } else if (this.generoSeleccionado === 'mujeres') {
      url = this.url_host + 'operadoresFemeninos';
    } else {
      url = this.url_host + 'operadores';
    }

    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.operadores = data.filter(op => !this.idsVotados.includes(Number(op.id)));
          
          if (this.operadores.length > 0) {
            this.operador = this.operadores[0];
          } else {
            this.juegoTerminado = true;
            this.operador = {
              id: '',
              nombre: '',
              genero: '',
              imagen_url: '',
              smashes: 0,
              passes: 0
            };
            console.log('No quedan operadores por votar.');
          }
  
          console.log('Operadores filtrados:', this.operadores);
        }
      },
      error: (err) => {
        console.error('Error al obtener operadores:', err);
      }
    });
  }
  filtrarOperadores() {
    this.getOperador();
  }

  

  votar(tipo: 'smash' | 'pass') {
    this.http.post<any>(this.url_host + 'voto', {
      operador_id: this.operador.id,
      tipo_voto: tipo
    }).subscribe({
      next: res => {

        this.idsVotados.push(Number(this.operador.id));
        localStorage.setItem('idsVotados', JSON.stringify(this.idsVotados));

        this.currentIndex ++

        let votosActualizados = {
          ...this.operador,
          tipo_voto: tipo,
          smashes: this.operador.smashes + (tipo === 'smash' ? 1 : 0),
          passes: this.operador.passes + (tipo === 'pass' ? 1 : 0)
        };

        this.operadorAnterior = votosActualizados;
        this.operador = this.operadores[this.currentIndex]
      },
      error: err => console.error('Error al votar:', err)
    });
  }
  volverInicio() {
    this.router.navigate(['/characters'])
  }
  

}
