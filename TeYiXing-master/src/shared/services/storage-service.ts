import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage'
import { AppUser } from '../models/user'

const LOGIN_USER = 'login-user'

@Injectable()
export class StorageService {
  constructor(private storage: Storage) {}

  saveUser(user: AppUser): Promise<any> {
    return this.storage.set(LOGIN_USER, user)
  }

  getUser(): Promise<AppUser> {
    return this.storage.get(LOGIN_USER)
  }

  getToken(): Promise<string> {
    return this.getUser().then(user => (user ? user.Token : undefined))
  }

  deleteUser(): Promise<any> {
    return this.storage.remove(LOGIN_USER)
  }
}
