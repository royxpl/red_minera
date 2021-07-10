
export class UsersModel{
  /* registro en uthenticate*/
  email:string;
  password:string;
  returnSecureToken:boolean;

  /* registro en users*/
  firts_name:string;
  sur_name:string;
  displayName:string; //nombre + apellido
  user:string; //usuario o nickname
  method:string;
  avatar:string;
  idToken:string;
  needConfirm:boolean;//confirmacion de email
  active:boolean;
  empresa:boolean;
  numero:number;

}
