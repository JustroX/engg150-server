import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { OfferDTO } from './offer.dto';
import { OfferService } from './offer.service';

@Controller('offer')
export class OfferController {
  constructor(private offer: OfferService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOffer(@Body() offer: OfferDTO) {
    const doc = await this.offer.createOffer(offer);
    const obj = doc.toObject();
    return obj;
  }
}
