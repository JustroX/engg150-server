import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Offer } from 'src/offer/offer.schema';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ type: Types.ObjectId, ref: 'Offer' })
  offer: Offer | string;

  @Prop()
  is_nft_received: boolean;
  @Prop()
  is_payment_received: boolean;
  @Prop()
  is_approved: boolean;

  @Prop()
  last_updated: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
