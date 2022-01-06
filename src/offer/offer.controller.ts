import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { OfferDTO } from './offer.dto';
import { OfferService } from './offer.service';

@Controller('offers')
export class OfferController {
  constructor(private offer: OfferService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOffer(@Body() offer: OfferDTO) {
    const doc = await this.offer.createOffer(offer);
    const obj = doc.toObject();
    return obj;
  }

  @Get(':id')
  async getOffer(@Param('id') id: string) {
    const doc = await this.offer.findOne(id);
    const obj = doc.toObject();
    return obj;
  }

  @Get()
  async getAll() {
    const docs = await this.offer.getAll();
    const objs = docs.map((x) => x.toObject());
    return objs;
  }
}
