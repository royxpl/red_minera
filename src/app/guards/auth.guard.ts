import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
//import { resolve } from 'dns';
import { ApiService } from '../services/api.service';

//import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private apiService:ApiService,
              private router:Router){}

  canActivate():Promise<boolean>{
    //route: ActivatedRouteSnapshot,
    //state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;
    return new Promise(resolve=>{
      this.apiService.authActivate().then(resp=>{
        if(!resp){
          this.router.navigateByUrl("login");
          resolve(false)
        }else{
          resolve(true)
        }
      })
    })

  }

}
