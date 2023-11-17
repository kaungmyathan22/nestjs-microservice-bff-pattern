import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Account, User } from './interfaces/user.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get_users' })
  getUsers(): User[] {
    return this.appService.getUsers();
  }

  @EventPattern({ cmd: 'create_account' })
  createUser(account: Account): User {
    const { id, login } = account;
    return this.appService.createUser({ id, login });
  }
}
