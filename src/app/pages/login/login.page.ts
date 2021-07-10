import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , NgForm } from '@angular/forms';
import { Router , ActivatedRoute} from '@angular/router';
import { LoadingController, MenuController,AlertController } from '@ionic/angular';
import { emailValidator } from 'src/app/validators/email.validators';
import { passwordValidator } from 'src/app/validators/password.validator';
/* MOLDES */
import { UsersModel } from '../../models/users.models';
/* SERVICES */
import { ApiService } from 'src/app/services/api.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user: UsersModel;
  public rememberMe:boolean = false;

  loginForm: FormGroup;
  loading: any;
  background = {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1051&q=80)',
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public apiService: ApiService,
    private activatedRoute:ActivatedRoute

  ) {
    this.user = new UsersModel();
  }
  ngOnInit() {

    if(localStorage.getItem("rememberMe")&& localStorage.getItem("rememberMe")=="yes"){
    this.user.email = localStorage.getItem("email");
    this.rememberMe=true;
    }
    if(this.activatedRoute.snapshot.queryParams["oobCode"]!=undefined && this.activatedRoute.snapshot.queryParams["mode"]=="verifyEmail"){
      let body={
        oobCode:this.activatedRoute.snapshot.queryParams["obbCode"]
      }
      console.log("oobcode ",body);
      this.apiService.confirmEmailVerificationFnc(body)
      .subscribe(resp=>{
        if(resp["emailVerified"]){
          this.apiService.getFilterData("email",resp["email"])
          .subscribe(resp=>{
            for(const i in resp){
              let id = Object.keys(resp).toString();
              let value={
                needConfirm:true
              }
              this.apiService.patchData(id,value)
              .subscribe(resp=>{
                if(resp["needConfirm"]){
                  console.log("mensaje:","el email fue confirmado , inicia sesion ahora y  login.");
                }
              })
            }
          })
        }
      },err =>{
        if(err == "INVALID_OBB_CODE"){
          console.log("error","el email ya ha sido confirmado ");
          console.log("err",err);
        }
      })
    }
    if(this.activatedRoute.snapshot.queryParams["obbCode"]!=undefined && this.activatedRoute.snapshot.queryParams["mode"]=="resetPassword"){
      let body={
        obbCode:this.activatedRoute.snapshot.queryParams["obbCode"]
      }
      this.apiService.verifyPasswordResetCodeFnc(body)
      .subscribe(resp=>{
        if(resp["requestType"]=="PASSWORD_RESET"){
          //$("#newPassword").modal()
        }
      })
    }

  }

  /** Metodo para envio de formulario **/
  onSubmit(f:NgForm){
    if(f.invalid){
      return;
    }
    this.cargando();
    this.apiService.getFilterData("email",this.user.email)
    .subscribe(resp1=>{
      for(const i in resp1){
        if(resp1[i].needConfirm){
          console.log("loading..y la verificasion es verdadera");
          this.user.returnSecureToken=true;
          this.apiService.loginAuth(this.user)
          .subscribe(resp2 =>{
            let id = Object.keys(resp1).toString();
            let value={
              idToken:resp2["idToken"]
            }
            this.apiService.patchData(id,value)
            .subscribe(resp3=>{
              if(resp3["idToken"]!=""){
                localStorage.setItem("idToken",resp3["idToken"]);
                localStorage.setItem("email",resp2["email"]);
                let today=new Date();
                //today.setSeconds(20);
                today.setSeconds(resp2["expiresIn"]);
                localStorage.setItem("expiresIn",today.getTime().toString());
                if(this.rememberMe){
                  localStorage.setItem("rememberMe","yes");
                }else{
                  localStorage.setItem("rememberMe","no");
                }
               // this.router.navigate(['/tabs/profile']);
                this.router.navigate(['/tabs/explore']);
              }
            })
          }, error =>{
            console.log("eroor en resp2 contraseña invalida ");
            this.showAlert( "Contraseña invalida");
          })
        }else{
            if(!resp1[i].needConfirm){
            this.router.navigate(['/onboarding']);
            }

        }
      }
    })
  }

  resetPassword(value){
    console.log("cargando resset pasword");
    this.apiService.getFilterData("email",value)
    .subscribe(resp=>{
      if(Object.keys(resp).length>0){
        let body ={
          requesType:"PASSWORD_RESET",
          email:value
        }
        this.apiService.sendPasswordResetEmailFnc(body)
        .subscribe(resp=>{
          if(resp["email"]==value){
            console.log("Mensaje :Revisar el correo para cambiar la contraseña,acceso ");
          }
        })
      }else{
        console.log("erro","el correo no existe a la base de datos");
      }
    })
  }

  newPassword(value){
    if(value!=""){
      console.log("cargando new pasword...");
      let body={
        oobCode :this.activatedRoute.snapshot.queryParams["oobCode"],
        newPassword:value
      }
      this.apiService.confirmPasswordResetFnc(body)
      .subscribe(resp=>{
        if(resp["requestType"]=="PASSWORD_RESET"){
          console.log("mensaje ","el password cambio satisfactoriamente,inicia session..");
        }
      })
    }
  }


  goBack() {
    this.router.navigate(['/welcome']);
  }

  /** Metodo validar login**/
  /*validate(input){
    this.apiService.getFilterData("user",input.value)
      .subscribe(resp=>{
        if(Object.keys(resp).length>0){
          console.log("usuario ya existe");
        }

      });
  }*/


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





}
