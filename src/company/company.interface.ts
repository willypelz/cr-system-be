import { UserData } from '../user/user.interface';
import { CompanyEntity } from './company.entity';
import { ReviewEntity } from './review.entity';

interface Review {
  body: string;
  status?: string;
  companyId?: string;
}

interface CompanyData {
  slug: string;
  title: string;
  description: string;
  createdAt?: Date
  updatedAt?: Date
  creator?: UserData;
}

export interface ReviewsRO {
  reviews: Review[];
}

export interface CompanyRO {
  company: CompanyEntity;
}
export interface ReviewET {
    reviews: ReviewEntity;
}

export interface CompaniesRO {
  companies: CompanyEntity[];
  companiesCount: number;
}

