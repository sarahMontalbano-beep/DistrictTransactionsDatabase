import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService, StorageData } from './storage.service';

// This class was heavily inspired by https://github.com/CharlBest/nean-stack-starter

@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate {

    readonly userLoggedInOrLoggedOut: EventEmitter<void> = new EventEmitter<void>();

    t : any | undefined = undefined;

    get isAuthenticated(): boolean {
        return this.hasToken();
    }

    constructor(private router: Router,
        private localStorageService: LocalStorageService) { }

    init(): void {

      this.localStorageService.loadStorageData();
      this.logoutIfTokenExpired();
      this.logoutTimer();

    }

    logoutTimer(): void {
      if (this.isAuthenticated && !this.hasStoredTokenExpired()) {
        this.t = setInterval( this.logoutIfTokenExpired.bind(this), (1000*10) );
        console.log('Timer started')
      }
    }
  
    logoutIfTokenExpired(): void {
      console.log('logoutIfTokenExpired');
      if (this.isAuthenticated && this.hasStoredTokenExpired()) {
        this.removeToken();
        this.router.navigate(['/unauthorized']);
        if (this.t != undefined) {
          clearInterval(this.t);
          console.log('Timer cleared')
        }
      }
    }

    getUserData(key: string): StorageData | null {
        const data = localStorage.getItem(key);
        if (data) {
            const jsonData = this.parseJSON(data) as StorageData;
            if (jsonData) {
                return jsonData; // user data
            } else {
                return null; // anonymous data
            }
        } else {
            return null; // anonymous data
        }
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
        return this.hasToken() || this.router.navigate(['login'], { queryParams: { returnUrl: state.url }, queryParamsHandling: 'merge' });
    }

    setToken(model: any): void {
        // Get token data
        const { id, expireDate } = this.getDataFromJWT(model.token);

        // Store token in local storage as well as email and username to select multiple accounts
        this.localStorageService.setUserStorageData({
            email: model.email,
            username: model.username,
            token: model.token,
            exp: expireDate
        });

        this.logoutTimer();
        this.userLoggedInOrLoggedOut.emit();
    }

    removeToken(): void {
        this.localStorageService.setUserStorageData({ token: null });

        this.userLoggedInOrLoggedOut.emit();
    }

    hasToken(): boolean {
        return !!this.localStorageService.storageData.token;
    }

    hasTokenExpired(token?: string | null): boolean {
        const { id, expireDate } = this.getDataFromJWT(token);
        if (!id || !expireDate) {
            return true;
        }

        if (Math.floor(Date.now() / 1000) >= expireDate) {
            return true;
        } else {
            return false;
        }
    }

    hasStoredTokenExpired(): boolean {
        if (this.localStorageService.storageData.exp &&
            Math.floor(Date.now() / 1000) >= this.localStorageService.storageData.exp) {
            return true;
        } else {
            return false;
        }
    }

    private getDataFromJWT(token?: string | null): { id: number | null, expireDate: number | null } {
        if (token) {
            const parsedToken = this.parseJwt(token) as { data: any, exp: number };

            const id = +parsedToken.data.i /* alias for ID */;
            const expireDate = +parsedToken.exp;

            return { id, expireDate };
        }

        return { id: null, expireDate: null };
    }

    private parseJwt(token: string): object | null {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return this.parseJSON(window.atob(base64));
    }

    private parseJSON(jsonString: string): object | null {
        try {
            return JSON.parse(jsonString);
        } catch {
            console.error('Error parsing JSON string');
            return null;
        }
    }
}
