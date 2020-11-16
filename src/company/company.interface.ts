import { UserData } from '../user/user.interface';
import { CompanyEntity } from './company.entity';
interface Review {
  body: string;
  status?: string;
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

export interface CompaniesRO {
  companies: CompanyEntity[];
  companiesCount: number;
}

