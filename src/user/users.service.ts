import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from './user-role';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findOne({ where: { email } });
  }

  async findOrCreateUserFromFirebase(payload: {
    firebaseUid: string;
    email: string;
    name?: string;
    role: Role;
    tenantId: string;
  }): Promise<User> {
    const existing = await this.findByEmail(payload.email);
    if (existing) return existing;

    const user = this.userRepo.create({
      firebaseUid: payload.firebaseUid,
      email: payload.email,
      name: payload.name || '',
      role: payload.role,
      store: { id: payload.tenantId },
    });

    return this.userRepo.save(user);
  }

  async create(payload: {
    firebaseUid: string;
    email: string;
    name?: string;
    role: Role;
    tenantId: string;
  }): Promise<User> {
    const user = this.userRepo.create({
      firebaseUid: payload.firebaseUid,
      email: payload.email,
      name: payload.name || '',
      role: payload.role,
      store: { id: payload.tenantId },
    });

    return await this.userRepo.save(user);
  }

}
