import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class AppService {
  users = [
    { id: 1, username: 'bob' },
    { id: 2, username: 'john' },
  ];

  getUsers(): User[] {
    return this.users;
  }

  createUser(username: string): User {
    const user = { username, id: this.users.length + 1 };
    this.users.push(user);

    return user;
  }
}
