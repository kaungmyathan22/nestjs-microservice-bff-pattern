import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';
import { AppService } from './app.service';
import { Account, User } from './interfaces/user.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('PUBSUB')
    private readonly client: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'get_users' })
  getUsers(): User[] {
    return this.appService.getUsers();
  }

  @EventPattern({ cmd: 'create_user' })
  createUser(account: Account): User {
    const { username, name } = account;
    const createdUser = this.appService.createUser(username);
    this.client.emit({ cmd: 'create_account' }, { id: createdUser.id, name });
    return createdUser;
  }
}
