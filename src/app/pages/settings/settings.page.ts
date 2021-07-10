import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  	/*=============================================
	Salir del sistema
	=============================================*/

	logout(){

		localStorage.removeItem('idToken');
    	localStorage.removeItem('expiresIn');
    	window.open('login', '_top')

	}

}
