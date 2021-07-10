import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import { map, switchMap, share } from 'rxjs/operators';
import * as Global from '../global';
/* MOLDES */
import { UsersModel } from '../models/users.models';
//import { resolve } from 'dns';

/******************************** */
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root',
})
export class ApiService {

  /** Variables Globales **/
  private api: string = Global.Api.url;
  private register: string = Global.Register.url;
  private login: string = Global.Login.url;
  private sendEmailVerification = Global.SendEmailVerification.url;
  private sendPasswordResetEmail: string = Global.SendPasswordResetEmail.url;
  private confirmPasswordReset: string = Global.ConfirmPasswordReset.url;
  private confirmEmailVerification: string =Global.ConfirmEmailVerification.url;
  private verifyPasswordResetCode: string = Global.VerifyPasswordResetCode.url;
  private getUserData:string = Global.GetUserData.url;
  confirmationResult: firebase.auth.ConfirmationResult;
  /** Constructor /*/
  constructor(public http: HttpClient,
              private fireAuth: AngularFireAuth) {}

/** Metodo inicio con TELEFONO */
public signInWithPhoneNumber(recaptchaVerifier, phoneNumber) {

  return new Promise<any>((resolve, reject) => {
    /** Metodo  registra con numero y captcha */
    this.fireAuth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
        resolve(confirmationResult);
        console.log("api.service ->fireAuth.signInWithPhoneNumber  : sms enviado ",resolve(confirmationResult));
      }).catch((error) => {
        console.log(error);
        reject('SMS no nviado');
      });
  });
}

public async enterVerificationCode(code) {
  return new Promise<any>((resolve, reject) => {
    this.confirmationResult.confirm(code).then(async (result) => {
      console.log("mi resultado luego se ser confirmado el sms",result);
      const user = result.user;
      console.log("user fin",user);
      resolve(user);
    }).catch((error) => {
      reject(error.message);
    });

  });
}

/******************************************************************************************** */


  /** Metodo REGISTRAR usuario en AUTHENTICATION de Firebase **/
  registerAuth(user: UsersModel) {
    return this.http.post(`${this.register}`, user);
  }

  /** Metodo REGISTRAR usuario en REALTIME de firebase **/
  registerDatabase(user: UsersModel) {
    delete user.password;
    delete user.returnSecureToken;

    return this.http.post(`${this.api}/users.json`, user);
  }

  /** Metodo LOGIN REALTIME */
  loginAuth(user: UsersModel) {
    //recibe el usuario

    return this.http.post(`${this.login}`, user);
  }

  /** Metod Filtrar para buscar coincidencias para username email */
  getFilterData(orderBy: string, equalTo: string) {
    return this.http.get(
      `${this.api}/users.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`
    );
  }

  /** Metodo para actualizar data usuario**/
  patchData(id: string, value: object) {
    return this.http.patch(`${this.api}/users/${id}.json`, value);
  }

  /** Resetear la contraseña */
  sendPasswordResetEmailFnc(body: object) {
    return this.http.post(`${this.sendPasswordResetEmail}`, body);
  }

  /** Confirmar Password enviar el password */
  confirmPasswordResetFnc(body: object) {
    return this.http.post(`${this.confirmPasswordReset}`, body);
  }

  /** Enviar verificación de correo electrónico */
  sendEmailVerificationFnc(body: object) {
    return this.http.post(`${this.sendEmailVerification}`, body);
  }

  /** Confirmar Email de Verificasion */
  confirmEmailVerificationFnc(body: object) {
    return this.http.post(`${this.confirmEmailVerification}`, body);
  }

  /** Confirmar el cambio de la contraseña*/
  verifyPasswordResetCodeFnc(body: object) {
    return this.http.post(`${this.verifyPasswordResetCode}`, body);
  }

  /** Validar idToken de Autenticación */

  authActivate(){

    return new Promise(resolve=>{
      if(localStorage.getItem("idToken")){
        let body ={
          idToken:localStorage.getItem("idToken")
        }
        this.http.post(`${this.getUserData}`, body)
        .subscribe(resp=>{
          console.log("resp",resp);
          if(localStorage.getItem("expiresIn")){
            let expiresIn = Number(localStorage.getItem("expiresIn"));
            let expiresDate = new Date();
            expiresDate.setTime(expiresIn);
            if(expiresDate>new Date()){
              resolve(true)
            }else{
              localStorage.removeItem('idToken');
              localStorage.removeItem('expiresIn');
            }
          }else{
            localStorage.removeItem('idToken');
            localStorage.removeItem('expiresIn');
            resolve(false)
          }
        },err =>{
          console.log("err",err);
          localStorage.removeItem('idToken');
          localStorage.removeItem('expiresIn');
          resolve(false)
        });
      }else{
        localStorage.removeItem('idToken');
        localStorage.removeItem('expiresIn');
        resolve(false)
      }
    })
  }


}
