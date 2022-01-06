import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OfferDTO } from './offer.dto';
import { Offer, OfferDocument } from './offer.schema';

@Injectable()
export class OfferService {
  constructor(@InjectModel(Offer.name) public model: Model<OfferDocument>) {}

  async createOffer(_offer: OfferDTO) {
    const offer = await new this.model();
    offer.nft_id = _offer.nft_id;
    offer.seller = _offer.seller;
    offer.buyer = _offer.buyer;
    offer.amount = _offer.amount;
    offer.createdAt = Date.now();
    await offer.save();
    return offer;
  }

  findOne(id: string) {
    return this.model.findById(id).exec();
  }

  getAll() {
    return this.model.find();
  }
}
