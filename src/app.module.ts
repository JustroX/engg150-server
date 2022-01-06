import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OfferModule } from './offer/offer.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/e150'), AuthModule, UserModule, OfferModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
