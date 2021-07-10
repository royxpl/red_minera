import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController ,AlertController,NavController } from '@ionic/angular';
import { emailValidator } from 'src/app/validators/email.validators';
import { passwordValidator } from 'src/app/validators/password.validator';

/* MOLDES */
import { UsersModel } from '../../models/users.models';
import { UsersSms} from '../../models/empresa.models';
/* SERVICES */
import { ApiService } from 'src/app/services/api.service';
//import { truncateSync } from 'fs';

import firebase from 'firebase/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  public usersms:UsersSms;
  public user: UsersModel;
  public status:string;
  registerForm: FormGroup;
  submitted = false;
  reg_empresa_activate: boolean = true;
  reg_formulario_activate: boolean = false;
  background = {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484712401471-05c7215830eb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)',
  };
  loading: any;

  CountryJson = environment.CountryJson;
  CountryCode: any = '+51';
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  PhoneNo: any;

  constructor(

    //private authService:AuthServiceService,

    private formBuilder: FormBuilder,
    private router: Router,
    public loadingCtrl: LoadingController,
    public apiService: ApiService,
    public menu: MenuController,
    public alertCtrl: AlertController,
    public navCtrl:   NavController

  ) {
    this.user = new UsersModel();
  }

  /** Datos Iniciales **/
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, emailValidator]], //email royxpl
      name: ['', Validators.required], //usuario :roy
      USU_APE: ['', Validators.required], //ibañez
      USU_EMP: ['', Validators.required], // gabasub
      password: ['', Validators.required], //para token
      phone: [null /* [Validators.required, Validators.pattern('^[0-9]+$')]*/], //telefono
    });

  }

  async ionViewDidEnter() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible', //invisible
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });
  }

  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible', //invisible
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });
  }

  CodigoPaisChange($event) {
    this.CountryCode = $event.detail.value;
  }

  // Button event after the nmber is entered and button is clicked
  IniciarconTelefono($event) {
    console.log('country', this.recaptchaVerifier);

    if (this.PhoneNo && this.CountryCode) {
      this.apiService.signInWithPhoneNumber(this.recaptchaVerifier, this.CountryCode + this.PhoneNo).then(
        success => {
          this.OtpVerificacion();
        }
      );
    }
  }


  async OtpVerificacion() {
    const alert = await this.alertCtrl.create({
      header: 'Verificar Codigo',
      backdropDismiss: false,
      inputs: [
        {
          name: 'otp',
          type: 'text',
          placeholder: 'Engresa tu codigo OPT',
        }
      ],
      buttons: [{
        text: 'Enter',
        handler: (res) => {
          this.apiService.enterVerificationCode(res.otp).then(
            userData => {
              this.showSuccess();

            }
          );
        }
      }
      ]
    });
    await alert.present();
  }

  async showSuccess() {
    const alert = await this.alertCtrl.create({
      header: 'Registro Exitoso',
      subHeader: 'Ahora solo completa tus datos',
      buttons: [
        {
          text: 'Ok',
          handler: (res) => {
            alert.dismiss();
           this.registrar_formulario(true);
           this.router.navigate(['/registro']);

          }
        }
      ]
    });
    alert.present();
  }

  validate(input):void{


    this.apiService.getFilterData("users",input.value)
      .subscribe(resp=>{
        if(Object.keys(resp).length>0){
          console.log("longitud:",Object.keys(resp).length);
          console.log("usuario ya existe");
          this.showAlert("Este usuario ya fue registrado anteriormente");
          return;
        }
      });
  }


  registrar_persona() {
    this.reg_empresa_activate = true;
  }

  registrar_empresa() {
    this.reg_empresa_activate = false;
  }

  registrar_formulario(aux){
    this.reg_formulario_activate = aux;
    if(this.reg_formulario_activate){
      this.router.navigate(['/welcome']);
    }
  }



  onSubmit(f:NgForm){
    if(f.invalid){
      console.log("hay algo malo en los datos enviados por el formulario");
      return;
    }
    console.log("cargando...");
    this.user.returnSecureToken = true;
    this.cargando();
    this.apiService.registerAuth(this.user)
      .subscribe(resp=>{
        console.log("user",resp);
        if(resp["email"]==this.user.email){
          let body={
            requestType:"VERIFY_EMAIL",
            idToken:resp["idToken"]
          }
          this.apiService.sendEmailVerificationFnc(body)
          .subscribe(resp=>{
            if(resp["email"]==this.user.email){
              this.user.displayName = `${this.user.firts_name} ${this.user.sur_name}`;
              this.user.method ="direct";
              this.user.needConfirm = false;
              this.user.user = this.user.user.toLowerCase();
              this.user.empresa=true;
              this.user.active=true;
              this.apiService.registerDatabase(this.user)
              .subscribe(resp=>{
                //this.status="registro exitoso";
                //this.cargando();
                //console.log("solo sale +ID user: token",resp);
                this.router.navigate(['/login']);
                console.log("Confirmar tu cuenta y tu email ");
                if(!this.user.needConfirm){
                  this.router.navigate(['/onboarding']);
                }
              })
            }

          })
        }
      },err=>{
        console.log("email existente|pass<6 caract | faltan llenar datos",err);
        this.showAlert( "email existente|pass<6 caract | faltan llenar datos") ;
      })
  }

  /** Carga loading... **/
  async cargando(){
    const cargador = await this.loadingCtrl.create({
      message:'Cargando...',
      translucent:true
    })
    await cargador.present();

    setTimeout(()=>{
      cargador.dismiss();
      //this.showAlert(stado);
    },1000)
  }

  /** Mensaje de registrado o no **/
  async showAlert( msj:string) {
    const alert = await this.alertCtrl.create({
      //header: 'Alert',//subHeader: 'SubTitle',
      message:msj,
      buttons: ['OK']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    //console.log("alerta validar email",result);
  }

  /** Volver a Welcome **/
  goBack() {
    this.router.navigate(['/welcome']);
  }




  signUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message:
        '<span class="loader"><span class="loader-inner"></span></span> <p>Loading</p>',
      duration: 2000,
      spinner: null,
    });
    await this.loading.present();
  }
}

