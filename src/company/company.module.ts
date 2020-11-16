import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';
import { Review } from './review.entity';
import { UserEntity } from '../user/user.entity';
import { CompanyService } from './company.service';
import { AuthMiddleware } from '../user/auth.middleware';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity, Review, UserEntity]), UserModule],
  providers: [CompanyService],
  controllers: [
    CompanyController
  ]
})
export class CompanyModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
                {path: 'companies', method: RequestMethod.POST},
                {path: 'companies/:slug', method: RequestMethod.DELETE},
                {path: 'companies/:slug', method: RequestMethod.PUT},
                {path: 'companies/:slug/reviews', method: RequestMethod.POST},
                {path: 'companies/:slug/reviews/:id', method: RequestMethod.DELETE}
        );
  }
}
