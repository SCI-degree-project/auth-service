import { User } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  facebookURL: string;

  @Column()
  instagramURL: string;

  @Column()
  tiktokURL: string;

  @OneToMany(() => User, user => user.store, {
    cascade: true,
    eager: true,
  })
  owners: User[];
}
