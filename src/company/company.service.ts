import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { Review } from './review.entity';
import { UserEntity } from '../user/user.entity';
import { CreateCompanyDto } from './dto';

import {CompanyRO, CompaniesRO, ReviewsRO} from './company.interface';
const slug = require('slug');

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findAll(query): Promise<CompaniesRO> {

    const qb = await getRepository(CompanyEntity)
      .createQueryBuilder('company')
      .leftJoinAndSelect('company.creator', 'creator');

    qb.where("1 = 1");


    if ('creator' in query) {
      const creator = await this.userRepository.findOne({username: query.creator});
      qb.andWhere("company.creatorId = :id", { id: creator.id });
    }

    qb.orderBy('company.created', 'DESC');

    const companiesCount = await qb.getCount();

    if ('limit' in query) {
      qb.limit(query.limit);
    }

    if ('offset' in query) {
      qb.offset(query.offset);
    }

    const companies = await qb.getMany();

    return {companies, companiesCount};
  }

  async findOne(where): Promise<CompanyRO> {
    const company = await this.companyRepository.findOne(where);
    return {company};
  }

  async addReview(slug: string, reviewData): Promise<CompanyRO> {
    let company = await this.companyRepository.findOne({slug});

    const review = new Review();
    review.body = reviewData.body;

    company.reviews.push(review);

    await this.reviewRepository.save(review);
    company = await this.companyRepository.save(company);
    return {company}
  }

  async deleteReview(slug: string, id: string): Promise<CompanyRO> {
    let company = await this.companyRepository.findOne({slug});

    const Review = await this.reviewRepository.findOne(id);
    const deleteIndex = company.reviews.findIndex(_Review => _Review.id === Review.id);

    if (deleteIndex >= 0) {
      const deleteReviews = company.reviews.splice(deleteIndex, 1);
      await this.reviewRepository.delete(deleteReviews[0].id);
      company =  await this.companyRepository.save(company);
      return {company};
    } else {
      return {company};
    }

  }

  async findActiveReviews(slug: string): Promise<ReviewsRO> {
    const company = await this.companyRepository.findOne({slug});
    const reviews = await this.reviewRepository.find({ where: { companyId: company.id, status: 'active'}});
    return {reviews: reviews};
  }
  async findReviews(slug: string): Promise<ReviewsRO> {
    const company = await this.companyRepository.findOne({slug});
    return {reviews: company.reviews};
  }

  async create(userId: number, companyData: CreateCompanyDto): Promise<CompanyEntity> {

    let company = new CompanyEntity();
    company.title = companyData.title;
    company.description = companyData.description;
    company.slug = this.slugify(companyData.title);
    company.reviews = [];

    const newCompany = await this.companyRepository.save(company);

    const createdBy = await this.userRepository.findOne({ where: { id: userId }, relations: ['companies'] });
    createdBy.companies.push(company);

    await this.userRepository.save(createdBy);

    return newCompany;

  }

  async update(slug: string, companyData: any): Promise<CompanyRO> {
    let toUpdate = await this.companyRepository.findOne({ slug: slug});
    let updated = Object.assign(toUpdate, companyData);
    const company = await this.companyRepository.save(updated);
    return {company};
  }

  async delete(slug: string): Promise<DeleteResult> {
    return await this.companyRepository.delete({ slug: slug});
  }

  slugify(title: string) {
    return slug(title, {lower: true}) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
  }
}
