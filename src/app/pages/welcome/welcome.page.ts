import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})

export class WelcomePage implements OnInit {
  background = {
    //backgroundImage: 'url(https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80)'
  };

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    public alerta: AlertController
  ) { }

  ngOnInit() { }


  /* FUNCION LOGIN *****/
  async goToLogin() {

    this.router.navigate(['/login']);
    /*const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      translucent: true,
    });

    await loading.present();

    setTimeout(() => {
      loading.dismiss();
      //this.router.navigate(['/login']);
    }, 1000); // dummy loader for Loggin In*/
  }
  /* FIN FUNCION LOGIN *****/


  /* FUNCION REGISTRO USUARIO *****/
  async goToRegister() {

    this.router.navigate(['/register']);
    /*
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      translucent: true,
    });

    await loading.present();

    setTimeout(() => {
      loading.dismiss();
      this.router.navigate(['/register']);
    }, 1000); // dummy loader for Loggin In*/
  }
  /* FIN FUNCION REGISTRO USUARIO *****/


}
