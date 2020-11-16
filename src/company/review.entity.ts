import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CompanyEntity } from './company.entity';

@Entity()
export class Review {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column({default: 'pending'})
  status: string;

  @ManyToOne(type => CompanyEntity, company => company.reviews)
  company: CompanyEntity;
}