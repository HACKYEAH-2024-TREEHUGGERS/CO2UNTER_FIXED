import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('districts')
export class District {
  /*
   * Represents the yearly absorption data for the district,
   * including carbon absorbed, stocked, and other ecological metrics.
   * All values are stored in grams.
   */

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column()
  id_district: number;

  @Column({ type: 'float' })
  co_absorbed: number;

  @Column({ type: 'float' })
  co_stocked: number;

  @Column({ type: 'float' })
  pm_removed: number;

  @Column({ type: 'float' })
  energy_saved: number;

  @Column({ type: 'float' })
  avoided_runoff: number;

  @Column({ type: 'float' })
  economic_value: number;

  @Column()
  number_of_plants: number;

  @Column()
  number_of_plants_studied: number;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
