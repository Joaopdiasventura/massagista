import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserContext {
  private userDataSource = new BehaviorSubject<User | undefined>(undefined);
  currentUserData = this.userDataSource.asObservable();

  constructor() {}

  updateUserData(data: User) {
    this.userDataSource.next(data);
  }
}
