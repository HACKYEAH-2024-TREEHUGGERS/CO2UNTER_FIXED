import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './users.schemas';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {}

  async getUser(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async createUser(user_in: CreateUserDto): Promise<User> {
    const user = new User();
    user.id = user_in.device_id;
    user.name = user_in.name;

    return await this.userRepository.save(user);
  }
}
