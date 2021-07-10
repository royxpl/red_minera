import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  data = [
    {
      image: 'assets/images/media.svg',
      title: 'Gracias por Registrarte a Red Minera',
      description: 'Espera unos momentos para validar tus Datos como Empresa Verificada'
    },
    /*{
      image: 'assets/images/dating.svg',
      title: 'Stay in touch with your love ones',
      description: 'Chat, post and grow with your family around'
    }*/
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate() {
    this.router.navigate(['/welcome']);
  }

}
