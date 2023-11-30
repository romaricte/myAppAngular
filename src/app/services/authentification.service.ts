import { AppUser } from './../model/user.module';
import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  users: AppUser[] = [];
  authenticateUser: AppUser | undefined;


  constructor() {
    this.users.push({
      userId:1,
      userName: "user",
      password: "1234",
      roles: ["USER"]
    },)
    this.users.push({
      userId:2,
      userName: "rita",
      password: "12345",
      roles: ["ADMIN"]
    },)
    this.users.push({
      userId:3,
      userName: "roma",
      password: "12346",
      roles: ["USER"]
    },)
    this.users.push({
      userId:4,
      userName: "lolita",
      password: "12347",
      roles: ["ADMIN", "USER"]
    },)
  }
  public login (userName: string, password:string): Observable<AppUser>{
    let appUser= this.users.find(u=>u.userName==userName);
    if(!appUser) return throwError(()=>new Error("User is not found"));
    if(appUser.password!=password) {
      return throwError(()=>new Error("User is not found"))
    }
    return of(appUser)
  }

  public authenticateUsers (appUser: AppUser): Observable<boolean>{
this.authenticateUser =appUser;
localStorage.setItem("authUser", JSON.stringify({userName: appUser.userName, roles: appUser.roles, jwt: "JWT-TOKEN"}))
return of(true);
}

public hasRole(roles: string): boolean{
this.authenticateUser?.roles.includes("ADMIN");
return this.authenticateUser!.roles.includes(roles);
}
public logout () :Observable<boolean>{
  this.authenticateUser= undefined;
  localStorage.removeItem("authUser");
  return of(true);
}
public isAuthenticated(): boolean{
  return this.authenticateUser!=undefined;
}


}
