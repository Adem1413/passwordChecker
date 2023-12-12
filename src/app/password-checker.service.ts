import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PasswordCheckerService {

  constructor(private http: HttpClient) {}

  checkPassword(txtFileUrl: string, inputPassword: string): Observable<boolean> {
    return this.http.get(txtFileUrl, { responseType: 'text' }).pipe(map((data: string) => {
        const passwordList = data.split('\n'); 
        return passwordList.includes(inputPassword);
      })
    );
  }
}
