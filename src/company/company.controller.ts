import {Get, Post, Body, Put, Delete, Query, Param, Controller} from '@nestjs/common';
import { Request } from 'express';
import { CompanyService } from './company.service';
import { CreateCompanyDto, CreateReviewDto } from './dto';
import { CompaniesRO, CompanyRO } from './company.interface';
import { ReviewsRO } from './company.interface';
import { User } from '../user/user.decorator';

import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation, ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('companies')
@Controller('companies')
export class CompanyController {

  constructor(private readonly companyService: CompanyService) {}

  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'Return all companies.'})
  @Get()
  async findAll(@Query() query): Promise<CompaniesRO> {
    return await this.companyService.findAll(query);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug): Promise<CompanyRO> {
    return await this.companyService.findOne({slug});
  }

  @Get(':slug/reviews')
  async findReviews(@Param('slug') slug): Promise<ReviewsRO> {
    return await this.companyService.findReviews(slug);
  }

  @Get(':slug/reviews/active')
  async findActiveReviews(@Param('slug') slug): Promise<ReviewsRO> {
    return await this.companyService.findActiveReviews(slug);
  }


  @ApiOperation({ summary: 'Create company' })
  @ApiResponse({ status: 201, description: 'The company has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@User('id') userId: number, @Body('') companyData: CreateCompanyDto) {
    return this.companyService.create(userId, companyData);
  }

  @ApiOperation({ summary: 'Update company' })
  @ApiResponse({ status: 201, description: 'The company has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':slug')
  async update(@Param() params, @Body('') companyData: CreateCompanyDto) {
    return this.companyService.update(params.slug, companyData);
  }

  @ApiOperation({ summary: 'Delete company' })
  @ApiResponse({ status: 201, description: 'The company has been successfully deleted.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':slug')
  async delete(@Param() params) {
    return this.companyService.delete(params.slug);
  }

  @ApiOperation({ summary: 'Create review' })
  @ApiResponse({ status: 201, description: 'The review has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post(':slug/reviews')
  async createReview(@Param('slug') slug, @Body('') reviewData: CreateReviewDto) {
    return await this.companyService.addReview(slug, reviewData);
  }

  @ApiOperation({ summary: 'Delete review' })
  @ApiResponse({ status: 201, description: 'The company has been successfully deleted.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':slug/reviews/:id')
  async deleteReview(@Param() params) {
    const {slug, id} = params;
    return await this.companyService.deleteReview(slug, id);
  }

}