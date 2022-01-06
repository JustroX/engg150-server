import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OfferDocument = Offer & Document;

@Schema()
export class Offer {
  @Prop()
  nft_id: string;
  @Prop()
  seller: string;
  @Prop()
  buyer: string;
  @Prop()
  amount: number;
  @Prop()
  timestamp: number;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
