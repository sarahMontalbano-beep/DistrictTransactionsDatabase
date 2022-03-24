import { Injectable } from '@angular/core';

// This class was heavily inspired by https://github.com/CharlBest/nean-stack-starter

// The purpose of this service is to provide a central place to access local storage.

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  readonly storageKey = 'apf_districts_';

  private localStorageData: StorageData = {
    consent: false,
    darkTheme: false,
    hasUserVisited: false
  };

  get storageData(): StorageData {
    return this.localStorageData;
  }

  setUserStorageData(data?: Partial<StorageData> | null): void {
    const updatedData = Object.assign(this.storageData, data);

    localStorage.setItem(this.storageKey,
      data ? JSON.stringify(updatedData) : '');
  }

  loadStorageData(): void {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      try {
        this.localStorageData = JSON.parse(data) as StorageData;
      } catch { }
    }
  }

}

export interface StorageData {
  email?: string | null;
  username?: string | null;
  default?: boolean | null;
  token?: string | null;
  exp? : number | null;
  consent: boolean;
  darkTheme: boolean;
  language?: string | null;
  hasUserVisited: boolean;
}
