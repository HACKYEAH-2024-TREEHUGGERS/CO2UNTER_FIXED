import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  activity: string;

  @Column()
  type: string;

  @Column('float')
  amount: number;

  @Column('float')
  // co2 in grams
  emission: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.activities)
  @JoinColumn({ name: 'created_by' })
  created_by: User;
}
