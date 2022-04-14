import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) { }

    async login(username: string, password: string): Promise<any> {
        let observable = this.http.post('http://localhost:5005/api/users/login', {username: username, password: password});

        let values = await lastValueFrom(observable);

        return values;
    }
}
