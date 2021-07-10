import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { LoadingController, MenuController ,AlertController,NavController } from '@ionic/angular';

import { UsersModel } from '../../models/users.models';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {


  public user: UsersModel;

  public reg_formulario_activate: boolean=true ;
  background = {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484712401471-05c7215830eb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)',
  };

  constructor(
    //private formBuilder: FormBuilder,
    private router: Router,
    public loadingCtrl: LoadingController,
    public apiService: ApiService,
    public menu: MenuController,
    public alertCtrl: AlertController,
    public navCtrl:   NavController
  ) {
    this.user = new UsersModel();
  }

  ngOnInit() {
  }


  onSubmit(f:NgForm){
    if(f.invalid){
      console.log("hay algo malo en los datos enviados por el formulario");
      return;
    }

    this.user.returnSecureToken = true;
    this.user.displayName = `${this.user.firts_name} ${this.user.sur_name}`;
    this.user.method ="direct";
    this.user.needConfirm = true;
    this.user.empresa=false;
    this.user.active=true;
    //this.cargando();
    this.apiService.registerDatabase(this.user)
    .subscribe(resp=>{
      this.router.navigate(['/tabs/explore']);
    })

  }
  /** Volver a Welcome **/
  goBack() {
    this.router.navigate(['/welcome']);
  }


}
